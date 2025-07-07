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

@get("/update")
def update():
    update_courses()
    return "OK"

scanner = Scanner()

if __name__ == "__main__":
    PORT = int(os.environ.get("CONTENT_SERVICE_PORT", 33001))
    HOST = '0.0.0.0'
    print(f"Starting server on {HOST}:{PORT}...")
    run(host=HOST, port=PORT, debug=True)