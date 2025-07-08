import os

from scanner import Scanner
from bottle import route, run, post, get


def update_courses():
    
    print("============================== COURSES ==============================")
    
    courses = scanner.getCourses()
    print(f"Courses: {courses}")
    
    for crs in courses:
        try:
            scanner.updateCourse(crs)
        except Exception as e:
            print(f"An error has occured when updating {crs}!!!\nException: {e}. \nContinuing to next course...")
    
    scanner.removeRedundantCourses()

def update_lessons():
    for crs in scanner.getCourses():
        print(f"====================== LESSONS FROM {crs} ======================")
        lessons = scanner.getLessons(crs)
        print(f"Lessons: {lessons}")

        for les in lessons:
            try:
                scanner.updateLesson(crs, les)
            except Exception as e:
                print(f"An error has occured when updating {crs}::{les}!!!\nException: {e}. \nContinuing to next lesson...")
        
        scanner.removeRedundantLessons(crs)

@get("/update")
def update():
    print("\n\n\n========= START =========\n\n\n")
    update_courses()
    update_lessons()
    print("\n\n\n========= END =========\n\n\n")
    return "OK"

scanner = Scanner()

if __name__ == "__main__":
    PORT = int(os.environ.get("CONTENT_SERVICE_PORT", 33001))
    HOST = '0.0.0.0'
    print(f"Starting server on {HOST}:{PORT}...")
    run(host=HOST, port=PORT, debug=True)
    # update()