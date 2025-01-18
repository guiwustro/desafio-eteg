# Desafio ETEG

## Technologies

The project was built using React, Node.js with NestJS and PostgreSQL as the
database.

## How to start the project

To start the project, it is recommended to use Docker, as it is already
configured with the Front-end, API and Database. After setting up Docker, please
run the following commands:

```
cp .env.example .env
cp backend/.env.example backend/.env
```

```
docker-compose up --build
```

The following command will run the migrations and also will create an user

```
make migrate-seed
```

The credentials of the created user are at the .env. In the .env.example is:

```
ADMIN_EMAIL=guitest@gmail.com
ADMIN_PASSWORD=123456
```

The front-end will be accessible at:

```
http://localhost:3005/
```

The docs will be accessible at:

```
http://localhost:4000/docs/
```

There is also a JSON collection available for import into Postman as an
alternative. Please note that the Postman JSON collection only includes the
endpoints and some examples. All the necessary documentation can be found in the
Swagger docs.

# Dashboard Pages

### **1. Admin Login**

**Route:** `/login`

**Description:** Authentication page for admin users.

- **Components and Features:**
  - Form with email and password fields.
  - Input validation (email format, required fields, etc.).
  - API integration for authentication using a token (saved to LocalStorage).
  - Redirect to `/admin/clients` on successful login.

---

### **2. Admin Dashboard (Client List)**

**Route:** `/admin/clients`

**Description:** Main dashboard page where all registered clients are listed.

- **Features:**
  1. **Client List:**
     - Table with columns such as Name, CPF, Email, Color, Status
       (Active/Inactive), and Actions.
  2. **Edit Client Button:**
     - Redirects to `/admin/clients/update/uuid` with client data preloaded.
  3. **Add New Client Button:**
     - Redirects to `/admin/clients/create`.
  4. **Delete Client Button:**
     - Displays a confirmation modal before deleting;
     - API integration for logical deletion.
  5. **Generate New Invitation (Modal):**
     - Modal with fields for invitation validity period and usage limits.
     - Generates a unique invitation link

---

### **3. Admin Dashboard - Add/Edit Client**

**Routes:**

- `/admin/clients/create` (Add)
- `/admin/clients/update/uuid` (Edit)

**Components and Features:**

- Reusable form for both creation and editing.
- Form fields:
  - Full name (required).
  - CPF with mask and validator (required).
  - Email with validator (required).
  - Favorite color.
  - Observations.
  - Status (only edit)
- On save:
  - Success/error message display.
  - Redirect to `/admin/clients` on success.

---

### **4. New Client Page**

**Route:** `/new-client/uuid`

**Description:** Page accessed via a unique link generated by the admin for new
client registration.

- **Components and Features:**
  1. **UUID Validation:**
     - Checks the database to verify if the UUID is valid and active - if is
       invalid redirect to a not-found page.
  2. **Registration Form:**
     - Same fields as the admin form, but without duplication checks (admin
       controls that).
     - On save, shows a success/error message.

## How to run the tests

You can execute them using the following command:

```
make test
```
