import os
import pathlib as path
from pathlib import Path

import psycopg2
import json

class Scanner:
    def __init__(self) -> None:
        self.courses_path   = Path(".", "content", "courses")
        self.comps_path     = Path(".", "content", "comps"  )
        self.db             = psycopg2.connect(database=os.environ["POSTGRES_DB"], user=os.environ["POSTGRES_USER"], password=os.environ["POSTGRES_PASSWORD"], host="db", port=5432)
        self.curr           = self.db.cursor()
    
    def getCourses(self):
        return [x.name for x in self.courses_path.iterdir() if x.is_dir()]
    
    def updateCourse(self, course):
        course_path = self.courses_path.joinpath(course)
        
        print(f"Accessing {course_path} ...")

        # Open config.json
        course_config = None
        with open(course_path.joinpath("config.json")) as f:
            course_config = json.load(f)

        print(f"Config: {course_config}")

        # Get course data from database
        self.curr.execute( "SELECT * FROM courses WHERE title=%s;", (course_config["title"],) )
        res = self.curr.fetchone()

        print(f"Database entry for course [{course_config["title"]}]: {res}")

        # If the course does not exist, then we need to create it in the database
        if (res == None):
            print("NO ENTRY FOUND! Creating new entry...")
            self.curr.execute( "INSERT INTO courses (title, description, author, hidden) VALUES (%s, %s, %s, %s);", (course_config["title"], course_config["description"], course_config["author"], course_config["hidden"]) )
        
        # Otherwise, update the course to reflect the current configuration
        else:
            print("Entry found, updating...")
            self.curr.execute( "UPDATE courses SET description=%s, author=%s, hidden=%s WHERE title=%s", (course_config["description"], course_config["author"], course_config["hidden"], course_config["title"]) )
        
        # Commit Changes
        self.db.commit()

        # Log final state
        self.curr.execute( "SELECT * FROM courses WHERE title=%s;", (course_config["title"],) )
        res2 = self.curr.fetchone()
        print(f"Updated database entry for course [{course_config["title"]}]: {res2}")

    def removeRedundantCourses(self):
        # Get courses on the database
        self.curr.execute("SELECT title FROM courses;")
        courses_db = set(map(lambda x: x[0], self.curr.fetchall()))

        print(f"Courses from DB: {str(courses_db)}")

        # Get local courses
        def getCourseTitle(crs):
            with open(self.courses_path.joinpath(crs, "config.json")) as f:
                return json.load(f)["title"]

        courses_local = set(map(getCourseTitle, self.getCourses()))
        print(f"Local courses: {str(courses_local)}")

        # Find redundant courses by set difference
        redundant_courses = courses_db.difference(courses_local)
        print(f"Redundant courses to be removed: {str(redundant_courses)}")

        # Remove reduandant courses
        print("Removing...")
        self.curr.executemany("DELETE FROM courses WHERE title=%s;", [(x,) for x in redundant_courses])
        self.db.commit()

        # Get courses on the database and check for success
        self.curr.execute("SELECT title FROM courses;")
        courses_db = set(map(lambda x: x[0], self.curr.fetchall()))
        if len(courses_db.difference(courses_local)) == 0:
            print("SUCCESS!")
        else:
            print("FAILURE! Inspect logs and DB...")

        