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
        course_config = self.__getCourseConfig(course)

        print(f"Config: {course_config}")

        # Get course data from database
        self.curr.execute( "SELECT * FROM courses WHERE title=%s;", (course_config["title"],) )
        res = self.curr.fetchone()

        print(f"Database entry for course [{course_config["title"]}]: {res}")

        # If the course does not exist, then we need to create it in the database
        if (res == None):
            print("NO ENTRY FOUND! Creating new entry...")
            self.curr.execute( "INSERT INTO courses (title, description, author, directory, hidden) VALUES (%s, %s, %s, %s, %s);", (
                course_config["title"], 
                course_config["description"], 
                course_config["author"], 
                course, 
                course_config["hidden"]
            ))
        
        # Otherwise, update the course to reflect the current configuration
        else:
            print("Entry found, updating...")
            self.curr.execute( "UPDATE courses SET description=%s, author=%s, directory=%s, hidden=%s WHERE title=%s", (
                course_config["description"], 
                course_config["author"], 
                course, 
                course_config["hidden"], 
                course_config["title"]
            ))
        
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

    ################################################################################################

    def getLessons(self, course):
        return [x.name for x in self.courses_path.joinpath(course).iterdir() if x.is_dir()]
    
    def updateLesson(self, course, lesson):
        
        lesson_path = self.courses_path.joinpath(course, lesson)
        print(f"Accessing {lesson_path} ...")
        
        # Open config.json
        lesson_config = None
        with open(lesson_path.joinpath("config.json")) as f:
            lesson_config = json.load(f)

        print(f"Config: {lesson_config}")
        
        # Get Course ID
        self.curr.execute( "SELECT * FROM courses WHERE title=%s;", (self.__getCourseConfig(course)["title"],) )
        res_id = self.curr.fetchone()
        if res_id == None: raise ValueError("Issue fetching course id in Scanner.updateLesson")

        # Get lesson data from database
        self.curr.execute( "SELECT * FROM lessons WHERE title=%s AND course=%s;", (lesson_config["title"], res_id[0]) )
        res = self.curr.fetchone()

        print(f"Database entry for lesson [{lesson_config["title"]}]: {res}")


        # If the lesson does not exist, then we need to create it in the database
        if (res == None):
            print("NO ENTRY FOUND! Creating new entry...")
            self.curr.execute( "INSERT INTO lessons (title, \"order\", interactive, course, directory, markdown, hidden) VALUES (%s, %s, %s, %s, %s, %s, %s);", (
                lesson_config["title"], 
                lesson_config["order"], 
                lesson_config["interactive"],
                res_id[0],
                lesson,
                lesson_config["markdown"],
                lesson_config["hidden"]
            ))

        # Otherwise, update the lesson to reflect the current configuration
        else:
            print("Entry found, updating...")
            self.curr.execute( "UPDATE lessons SET \"order\"=%s, interactive=%s, directory=%s, markdown=%s, hidden=%s WHERE title=%s", (
                lesson_config["order"], 
                lesson_config["interactive"],
                lesson,
                lesson_config["markdown"],
                lesson_config["hidden"],
                lesson_config["title"]
            ))
        
        # Commit Changes
        self.db.commit()

        # Log final state
        self.curr.execute( "SELECT * FROM lessons WHERE title=%s AND course=%s;", (lesson_config["title"], res_id[0]) )
        res2 = self.curr.fetchone()
        print(f"Updated database entry for lesson [{lesson_config["title"]}]: {res2}")
    
    def removeRedundantLessons(self, course):
        
        course_name = self.__getCourseConfig(course)["title"]

        # Use course id to get the titles of each lesson in the course
        self.curr.execute("SELECT title FROM lessons WHERE course=(SELECT id FROM courses WHERE title=%s);", (course_name,))
        lessons_db = set(map(lambda x: x[0], self.curr.fetchall()))

        print(f"Lessons from DB: {str(lessons_db)}")

        # Get local lessons
        def getLessonTitle(les):
            with open(self.courses_path.joinpath(course, les, "config.json")) as f:
                return json.load(f)["title"]

        lessons_local = set(map(getLessonTitle, self.getLessons(course)))
        print(f"Local lessons: {str(lessons_local)}")

        # Find redundant lessons by set difference
        redundant_lessons = lessons_db.difference(lessons_local)
        print(f"Redundant lessons to be removed: {str(redundant_lessons)}")

        # Remove reduandant courses
        print("Removing...")
        self.curr.executemany("DELETE FROM lessons WHERE title=%s AND course=(SELECT id FROM courses WHERE title=%s);", [ (x, course_name) for x in redundant_lessons])
        self.db.commit()

        # Get courses on the database and check for success
        self.curr.execute("SELECT title FROM lessons WHERE course=(SELECT id FROM courses WHERE title=%s);", (course_name,))
        lessons_db = set(map(lambda x: x[0], self.curr.fetchall()))
        if len(lessons_db.difference(lessons_local)) == 0:
            print("SUCCESS!")
        else:
            print("FAILURE! Inspect logs and DB...")

    def __getCourseConfig(self, course):
        # Get Course Name
        course_path = self.courses_path.joinpath(course)
        
        course_config = None
        with open(course_path.joinpath("config.json")) as f:
            course_config = json.load(f)
        
        return course_config