# Task API Server #

## Instructions ##

Create a simple one-page application that allows users to manage a task list.

**Requirements**

- You must use the API methods described in this document
- Your application must use Angular 1
- Your application must use Bootstrap (any version)
- Authentication
	- You must have a login and registration form
	- Once logged in, the user must remain logged in for 7 days
	- You must offer an option to logout
- Tasks
	- Your application must display the user's tasks
	- The task list must display how long ago the task was created ("Created 1h ago", "Created a few seconds ago", ...)
	- The user must be able to create a new task with at minimum:
		- Title
		- Text
		- Status (todo, completed, in-progress, ...)
	- The user needs to be able to change the status of multiple tasks at once
	- The user needs to be able to display only the tasks that have a specific status of their choice
	- The user needs to be able to display a task
	- The user must be able to format his task using the Markdown format (I recommend https://github.com/chjj/marked)
	- The user needs to be able to edit a task
	- The user needs to be able to access a task by its url. (example: *example.com/#/task/SkbuNdScb*)


Feel free to have fun with it and showcase what you can do.

The limit to complete this project is 1 week from the time the email was sent to you.

Once completed, upload your code to github and email julien@fleetwit.com

If you have any question or issue:
- Chat (hangout): julien@fleetwit.com
- Chat (facebook messenger): https://www.facebook.com/julien
- Email: julien@fleetwit.com

**What we'll be judging:**

- Code quality & structure
- UX/UI
- Creativity

## API Basics ##

The API is located at https://task-api-server.herokuapp.com/

It supports JSONP. You need to provide the name of the callback as a parameter.

	https://task-api-server.herokuapp.com/api/auth/register?callback=callback_fn&email=xpymb%40gmail.com&password=vn1hv08c

The response is always returned in JSON format.

Whenever the API returns an error response, it will return it in this format:

	{
		"error": true,
		"message": "The error message"
	}


A simple demo demonstrating each API call's parameters and response is available here: https://fleetwit.github.io/frontend-job-task/

The code is available here: https://github.com/Fleetwit/frontend-job-task

## API: Authentication ##

To register and login, you need to provide an email and a password. Both methods return the user's uid and token. 

To authenticate any other API calls, you need to provide the uid and token as parameters.

### Registration ###

> /api/auth/register

This will create an basic user object containing the creation date, uid, token (for authentication) and an empty data object.

You can attach a username or any other information using the `/api/auth/save` api call.

**Parameters:**

- email
- password

**Response**

    {
        "uid": "ryj7SuBcZ",
        "token": "Hyes7S_H5Z"
    }


### Login ###

> /api/auth/login

This will return the user's entire data.

**Parameters:**

- email
- password


**Response**

    "response": {
        "uid": "ryj7SuBcZ",
        "token": "Hyes7S_H5Z",
		"created": "2017-09-12T19:13:47.391Z",
		"data": {}
    }



### Save data on the profile ###

> /api/auth/save

You can save any data on the user profile. The data you send will be saved under the `data` object on the user's profile.

**Parameters:**

- uid
- token
- data: object


Example value for `data`:

	{
        "name": "Tony Stark",
        "phone": "206-724-4619"
    }

**Response**

    "response": {
        "status": "updated"
    }


## API: Tasks ##
### Create ###

> /api/task/create

**Parameters:**

- uid
- token
- data: Task's data object

Example value for `data`:

	{
        "title": "Autem est",
        "text": "Quis quasi voluptate vero totam. Deleniti voluptatem perspiciatis provident sit.",
        "status": "todo"
    }

**Response**

    {
        "id": "SyWsmS_rcZ",
        "uid": "ryj7SuBcZ",
        "created": "2017-09-12T14:54:27.174Z",
        "data": {
            "title": "Autem est",
            "text": "Quis quasi voluptate vero totam. Deleniti voluptatem perspiciatis provident sit.",
            "status": "todo"
        },
        "_id": "59b7f523096d4b56c03b1c2a"
    }

### Update ###

> /api/task/update

**Parameters:**

- uid
- token
- id: task ID
- data: Task's data object

Example value for `data`:

	{
        "status": "completed",
		"completionDate": "2017-09-12T14:54:27.207Z"
    }

**Response**

    {
        "status": "updated"
    }


### List all the tasks ###

> /api/task/list

This returns the tasks in descending order of creation, most recent first.

**Parameters:**

- uid
- token

**Response**

    [
        {
            "_id": "59b7f523096d4b56c03b1c2e",
            "id": "rJBs7B_B5W",
            "uid": "ryj7SuBcZ",
            "created": "2017-09-12T14:54:27.203Z",
            "data": {
                "title": "Quis repudiandae ipsam",
                "text": "Quos exercitationem earum hic ut voluptatem unde blanditiis. Explicabo asperiores doloremque tempora dignissimos voluptas sunt eum distinctio. Et repellat unde sit expedita dolores. Distinctio cumque molestias maxime in.",
                "status": "todo"
            }
        },
        {
            "_id": "59b7f523096d4b56c03b1c2d",
            "id": "rJNomrurq-",
            "uid": "ryj7SuBcZ",
            "created": "2017-09-12T14:54:27.176Z",
            "data": {
                "title": "Quia qui",
                "text": "Aut quia eligendi qui eos consequuntur. Dicta voluptas atque placeat qui molestiae excepturi nulla aut voluptatem. Tempora ipsa voluptas velit.",
                "status": "todo"
            }
        },
		...
    ]


### Get a task ###

> /api/task/get

**Parameters:**

- uid
- token
- id: task ID

**Response**

    {
        "id": "rJBs7B_B5W",
        "uid": "ryj7SuBcZ",
        "created": "2017-09-12T14:54:27.203Z",
        "data": {
            "title": "Quis repudiandae ipsam",
            "text": "Quos exercitationem earum hic ut voluptatem unde blanditiis. Explicabo asperiores doloremque tempora dignissimos voluptas sunt eum distinctio. Et repellat unde sit expedita dolores. Distinctio cumque molestias maxime in.",
            "status": "todo"
        }
    }

