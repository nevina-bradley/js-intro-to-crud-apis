# HTTP and CRUD

Welcome to our lab on building a simple Node Express app to store contact addresses in a JSON file! In this lab, we will explore the fascinating world of web development and learn about HTTP methods, which are essential for communication between web applications and servers.

## Before you get started

Just incase you forgot

- [Git Command CheatSheet](./GitCheatSheet.md)

## HTTP

HTTP stands for Hypertext Transfer Protocol, and it is the foundation of data communication on the World Wide Web. When you type a website address in your browser, an HTTP request is sent to the server hosting that website, and the server responds with the requested data. HTTP methods are like instructions that define the purpose of the request and determine what the server should do.

Think of HTTP methods as different actions you can perform when interacting with a web application. Here are a few examples to help you understand:

1. **GET**: Imagine you want to visit a news website to read an article. When you click on the article link, your browser sends a GET request to the server, asking for the content of that article. The server responds by sending the requested article back to your browser.

2. **POST**: Let's say you want to create a new post on a social media platform. When you write your post and click the "Post" button, your browser sends a POST request to the server with the content of your post. The server then saves your post in its database and returns a response confirming that the post has been created.

3. **PUT**: Suppose you found a mistake in an online document and want to correct it. In this case, you can send a PUT request to the server with the corrected content. The server receives the request, updates the document with the new information, and sends a response indicating the successful update.

4. **DELETE**: Imagine you want to remove a photo from your cloud storage. By sending a DELETE request to the server with the photo's unique identifier, the server will remove the photo from your storage and respond with a confirmation that the deletion was successful.

## CRUD

Certainly! Here's a definition of CRUD:

CRUD is an acronym that stands for Create, Read, Update, and Delete. It represents the four fundamental operations or actions that can be performed on data in a persistent storage system, such as a database. CRUD operations are commonly used in the context of database management systems and web development, particularly when working with APIs.

Here's a breakdown of each CRUD operation:

- **Create**: This operation involves creating or inserting new data into a storage system. It typically involves providing the necessary data and saving it as a new record or entity. For example, in the context of a contact management application, the "Create" operation would allow users to add a new contact with details like name, phone number, and email address.

- **Read**: The Read operation retrieves or reads existing data from the storage system. It involves retrieving one or more records or entities from the storage based on specified criteria. For instance, in the contact management application, the "Read" operation could be used to fetch all contacts, retrieve a specific contact by ID, or search for contacts based on specific attributes.

- **Update**: The Update operation modifies or updates existing data in the storage system. It involves changing the values of one or more fields within a record or entity while preserving its unique identifier. In the contact management application, the "Update" operation would allow users to edit the details of an existing contact, such as updating the phone number or email address.

- **Delete**: The Delete operation removes or deletes existing data from the storage system. It involves permanently removing a record or entity from the storage based on a specified identifier. In the contact management application, the "Delete" operation would enable users to delete a contact from their list, removing all associated details.

CRUD operations form the foundation of many web applications and APIs, allowing users to interact with and manipulate data. By implementing these operations, developers can enable the creation, retrieval, modification, and deletion of data, providing a comprehensive set of functionalities for managing and working with persistent data.


## HTTP and CRUD

Here's an explanation of how CRUD operations align with HTTP methods:

1. **Create (C) - HTTP Method: POST**
   The POST method is commonly used to create or insert new resources on the server. When you send a POST request to a specific endpoint, you are asking the server to create a new resource based on the data provided in the request body. For example, in an API for managing blog posts, you would use the POST method to create a new blog post by sending the necessary data (title, content, author) in the request body.

2. **Read (R) - HTTP Method: GET**
   The GET method is used to retrieve or read existing resources from the server. When you send a GET request to a specific endpoint, you are asking the server to retrieve the resource or collection of resources associated with that endpoint. For instance, in the blog post API, you would use the GET method to fetch all blog posts or retrieve a specific post by its unique identifier.

3. **Update (U) - HTTP Method: PUT or PATCH**
   The PUT and PATCH methods are commonly used for updating existing resources on the server.
   
   - **PUT**: The PUT method is used to completely replace an existing resource with the new data provided in the request. When you send a PUT request to a specific endpoint, you are asking the server to update the resource entirely with the data you've provided. For example, in the blog post API, you would use the PUT method to replace the content of a blog post with the updated data sent in the request body.

   - **PATCH**: The PATCH method is used to partially update an existing resource with the new data provided in the request. When you send a PATCH request to a specific endpoint, you are asking the server to apply only the changes specified in the request, leaving the rest of the resource intact. For instance, in the blog post API, you would use the PATCH method to update specific fields of a blog post, such as modifying the title or author.

4. **Delete (D) - HTTP Method: DELETE**
   The DELETE method is used to remove or delete existing resources from the server. When you send a DELETE request to a specific endpoint, you are asking the server to delete the associated resource. For example, in the blog post API, you would use the DELETE method to remove a blog post entirely by specifying its unique identifier.

By mapping the appropriate HTTP methods to CRUD operations, developers can create APIs that follow the REST architectural style and adhere to the principles of resource-based interactions. This standardized approach makes APIs more intuitive and easier to understand, as the HTTP methods align with the actions performed on resources in a consistent manner.

## The Lab

During this lab, you will be building a Node Express app that allows users to store contact addresses. You will utilize the power of HTTP methods to handle various actions, such as creating new contacts, retrieving existing contact information, updating contact details, and even deleting contacts.

By the end of this lab, you will have a practical understanding of how web applications communicate with servers using HTTP methods. You will also have developed a functional Node Express app that stores contact addresses in a JSON file, which can be a great starting point for building more complex web applications in the future.


So, let's dive in and embark on this exciting journey of web development and HTTP methods!

## Step 1: Environment Setup

To begin, install Node.js and npm (Node Package Manager) if you haven't already. You can download them from the official Node.js website.

Once Node.js and npm are installed, create a new directory for your project and initialize it with npm:

```bash
npm init -y
```

This will create a `package.json` file in your project directory.

Now, install Express and body-parser:

```bash
npm install express body-parser
```

## Step 2: Server Setup

Now, create an `app.js` file in your project directory. This file will create an Express server and define the API endpoints:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Address Book app listening on port 3000!'));
```

You can now start the server with `node app.js` and it should print "Address Book app listening on port 3000!" to the console. If you visit `http://localhost:3000` in a browser, you will see "Cannot GET /" because we haven't defined any endpoints yet.

## Step 3: CRUD API Endpoints

In this step, we'll add CRUD (Create, Retrieve, Update, Delete) API endpoints to our Express server.

### 3.1 Retrieve all addresses

```javascript
const fs = require('fs');
const dataFile = '.data/addressBook.json';

app.get('/addresses', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(JSON.parse(data));
    });
});
```

This endpoint reads the entire JSON file and sends it back to the client.

### 3.2 Retrieve a specific address

```javascript
app.get('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const address = addresses.find(a => a.id === req.params.id);
        if (!address) {
            res.status(404).send('Address not found');
            return;
        }
        res.send(address);
    });
});
```

This endpoint finds an address by its `id` property and returns it. If the `id` is not found, it sends a 404 error.

### 3.3 Create a new address

```javascript
app.post('/addresses', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const newAddress = req.body;
        newAddress.id = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;
        addresses.push(newAddress);
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.send(newAddress);
        });
    });
});
```

This endpoint reads the entire JSON file, adds a new address to the array, then writes the updated array back to the file.

### 3.4 Update an address

```javascript
app.put('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const index = addresses.findIndex(a => a.id === req.params.id);
        if (index === -1) {
            res.status(404).send('Address not found');
            return;
        }
        const updatedAddress = req.body;
        updatedAddress.id = req.params.id;
        addresses[index] = updatedAddress;
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.send(updatedAddress);
        });
    });
});
```

This endpoint finds an address by its `id` property, updates it with the new data, then writes the updated array back to the file.


### 3.5 Delete an address

```javascript
app.delete('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const index = addresses.findIndex(a => a.id === req.params.id);
        if (index === -1) {
            res.status(404).send('Address not found');
            return;
        }
        addresses.splice(index, 1);
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.status(204).send();
        });
    });
});
```

This endpoint finds an address by its `id` property, removes it from the array, then writes the updated array back to the file.

## Testing in PostMan

**Step 1: Download and Install Postman**

You can download Postman from their official website at https://www.postman.com/downloads/. Install it following the provided instructions for your specific operating system.

**Step 2: Start Your Express.js App**

Before you can test your API, make sure your Express.js app is running. In your terminal, navigate to your project's folder and run:

```bash
node app.js
```

**Step 3: Open Postman and Create a New Request**

After you've launched Postman, you can create a new request by clicking on the "+" tab. You'll use this to setup the requests for your endpoints.

**Step 4: Test Endpoints**

**GET all addresses:**

1. Set the HTTP method to "GET".
2. In the request URL field, type "http://localhost:3000/addresses".
3. Click "Send". You should see the array of addresses in the response body.

**GET a specific address:**

1. Set the HTTP method to "GET".
2. In the request URL field, type "http://localhost:3000/addresses/1" (replace "1" with the ID of the address you want to retrieve).
3. Click "Send". You should see the details of the address with the specified ID in the response body.

**POST a new address:**

1. Set the HTTP method to "POST".
2. In the request URL field, type "http://localhost:3000/addresses".
3. Click on the "Body" tab, select "raw", and choose "JSON" from the dropdown.
4. In the text field that appears, input the new address data as a JSON object. For example:

```json
{
    "name": "Jane Doe",
    "street": "456 Main St",
    "city": "Anytown",
    "state": "NY",
    "zip": "67890"
}
```

5. Click "Send". You should see the new address in the response body with an ID assigned.

**PUT to update an address:**

1. Set the HTTP method to "PUT".
2. In the request URL field, type "http://localhost:3000/addresses/1" (replace "1" with the ID of the address you want to update).
3. Follow the same steps as for POST to provide the updated address data.
4. Click "Send". You should see the updated address in the response body.

**DELETE an address:**

1. Set the HTTP method to "DELETE".
2. In the request URL field, type "http://localhost:3000/addresses/1" (replace "1" with the ID of the address you want to delete).
3. Click "Send". You should get a 204 No Content response, indicating that the address was successfully deleted.

Remember to replace "http://localhost:3000" with the URL of your Express.js app if it's deployed somewhere other than localhost, and replace the port "3000" with the actual port if it's different.

## Assignment

Add Unit Testing for all methods

