from scanner import Scanner

scanner = Scanner()

def update_courses():
    print("============================== COURSES ==============================")
    courses = scanner.getCourses()
    print(f"Courses: {courses}")
    for crs in courses:
        scanner.updateCourse(crs)
    scanner.removeRedundantCourses()

if __name__ == "__main__":
    update_courses()
