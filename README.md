# UWCS Academy

-------

# Working Notes

## TODO

* Database (PostgresSQL with Docker compose)
* Figure out how to structure courses and competitions
    * File-based, as per the last system
    * EVERYTHING based on config files
* Admin page 
* judge0

## Competition File Structure
* Each competition is it's own directory
* config.json file at root, plus one directory for each question
* Questions also have config.json (timings, marking weights)
* Each question has a markdown file specifiying the problem, and any info that's needed to mark the question
* **THOUGHT**: There should be a process in a separate thread that regularly checks the directory, and updates the database to ensure everything's consistent
* **THOUGHT-THOUGHT**: Re-structure to the project to be...

uwcs-academy
|
|--- compose.yml (includes the webapp, all services, and a DB)
|
|--- academy-webapp (guess who's back?)
|
|--- content
|       |
|       |--- courses
|       |
|       |--- comps
|
|--- services
        |
        |--- update_content

**services** will be a series of Python background tasks, that update the database (and maybe send messages to the webapp when needed)