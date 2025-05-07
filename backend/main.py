import shutil
import os
import uuid  # To generate unique filenames
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pymongo import MongoClient
from bson import ObjectId
from typing import List
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from fastapi import Depends, Cookie, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
import jwt
import datetime
from typing import Optional
# pip install uvicorn
# pip install python-multipart
# pip install pymongo
# pip install fastapi[all]
# pip install passlib pyjwt
# pip install bcrypt==3.2.0 passlib[bcrypt]==1.7.4
from fastapi import Query


app = FastAPI()

# Add CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    # allow_origins=["http://192.168.1.62:3000"],  # React frontend URL
    
    # allow_origins=["*"],  # Adjust this to restrict to your frontend's origin
    #  allow_origins=[
    #     # "http://localhost:3000",   # Local React server
    #     "http://192.168.1.72:3000", # Specific IP address for your local network
    # ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.mount("/uploaded_files", StaticFiles(directory="uploaded_files"), name="uploaded_files")

# MongoDB connection
# client = MongoClient("mongodb://localhost:27017")
client = MongoClient("mongodb+srv://shanvas786:toor@cluster0.un4re1j.mongodb.net/")

# mongodump --uri="mongodb+srv://shanvas786:toor@cluster0.un4re1j.mongodb.net/"  //mongodump (optional for full DB export
# mongodump --uri="mongodb+srv://shanvas786:toor@cluster0.un4re1j.mongodb.net/" --db=task_db

# MongoDB Import (if using .json file):
# mongoimport --uri="mongodb+srv://shanvas786:toor@cluster0.un4re1j.mongodb.net/" --collection tab --file tab.json --jsonArray
# mongorestore --uri="mongodb+srv://shanvas786:toor@cluster0.un4re1j.mongodb.net/" --db=test dump/test





db = client ['task_db']    # or db = client.grocery_db
usercollection = db['users']
cart_collection = db["carts"]


task_collection = db["tasks"]
taskcart_collection = db["task_carts"]

################Start task################
# Pydantic model for a single cart task
class CartTask(BaseModel):
    cart_id: int
    cart_title: str
    cart_description: str = ""
    cart_priority: str
    cart_status: str
    cart_created_at: Optional[str] = None  # Optional field from frontend

# Pydantic model for cart task update request
class Cart(BaseModel):
    email: EmailStr
    tasks: List[CartTask]    

# POST route to add a task
@app.post("/tasks")
async def update_cart(cart: Cart):
    # Check if the user is authorized (simplified for this example)
    if not cart.email:
        raise HTTPException(status_code=400, detail="Email is required for cart update.")
    
    # Check if the user already has a cart in the database
    user_cart = taskcart_collection.find_one({"email": cart.email})

    if not user_cart:
        # If the user doesn't have a cart, create a new one
        taskcart_collection.insert_one({"email": cart.email, "tasks": []})
        user_cart = taskcart_collection.find_one({"email": cart.email})

    # Get existing items in the user's cart
    existing_tasks = user_cart.get("tasks", [])

     # Loop through the cart items to check for duplicates
    for task in cart.tasks:
        # Try to find the existing item by matching `id`
        task_found = False
        
        for existing_task in existing_tasks:
            if existing_task['cart_id'] == task.cart_id:
                existing_task['cart_title'] = task.cart_title
                existing_task['cart_description'] = task.cart_description
                existing_task['cart_priority'] = task.cart_priority
                existing_task['cart_status'] = task.cart_status
                task_found = True
                break  # Exit the loop once the product is found and updated

        # If the product was not found, add it as a new item
        if not task_found:
            newtask = {
                        "cart_id": task.cart_id,
                        "cart_title": task.cart_title,
                        "cart_description": task.cart_description,
                        "cart_priority": task.cart_priority,
                        "cart_status": task.cart_status,
                        "cart_created_at": datetime.datetime.now(datetime.timezone.utc).strftime("%d-%m-%Y %H:%M:%S")

                      }
            existing_tasks.append(newtask)

    # Update the task's cart 
    taskcart_collection.update_one(
        {"email": cart.email},
        {"$set": {"tasks": existing_tasks}}
    )

    return {"message": "Cart updated successfully!", "updated_tasks": existing_tasks,}

    # created_task = create_task(task)
    # return JSONResponse(content=created_task, status_code=200)
@app.put("/tasks")
async def update_cart(cart: Cart):
    if not cart.email:
        raise HTTPException(status_code=400, detail="Email is required for cart update.")

    user_cart = taskcart_collection.find_one({"email": cart.email})
    if not user_cart:
        taskcart_collection.insert_one({"email": cart.email, "tasks": []})
        user_cart = taskcart_collection.find_one({"email": cart.email})

    existing_tasks = user_cart.get("tasks", [])

    for task in cart.tasks:
        task_found = False
        for existing_task in existing_tasks:
            if existing_task['cart_id'] == task.cart_id:
                existing_task.update({
                    "cart_title": task.cart_title,
                    "cart_description": task.cart_description,
                    "cart_priority": task.cart_priority,
                    "cart_status": task.cart_status
                })
                task_found = True
                break

        if not task_found:
            newtask = {
                "cart_id": task.cart_id,
                "cart_title": task.cart_title,
                "cart_description": task.cart_description,
                "cart_priority": task.cart_priority,
                "cart_status": task.cart_status,
                "cart_created_at": datetime.datetime.now(datetime.timezone.utc).strftime("%d-%m-%Y %H:%M:%S")
            }
            existing_tasks.append(newtask)

    taskcart_collection.update_one({"email": cart.email}, {"$set": {"tasks": existing_tasks}})
    return {"message": "Cart updated successfully!", "updated_tasks": existing_tasks}    

@app.get("/tasks")
def get_user_tasks(email: str = None, category: str = None, cart_id: int = None):
    print("GET  Received  email",email,"id : ",cart_id, " category:",category)
    query = {}
    existing_tasks = []

    if email:
        query["email"] = email
        user_cart = taskcart_collection.find_one(query)
        if not user_cart:
            return {
                "email": email,
                "updated_tasks": [],
                "total_tasks_count": 0
            }
        existing_tasks = user_cart.get("tasks", [])
    else:
        all_carts = taskcart_collection.find()

        for cart in all_carts:
            existing_tasks.extend(cart.get("tasks", []))

    if category:
        existing_tasks = [task for task in existing_tasks if task.get("cart_status") == category]
    if cart_id is not None and email is not None:
        existing_tasks = [task for task in existing_tasks if task.get("cart_id") == cart_id]    

    total_tasks_count = len(existing_tasks)

    return {
        "email": email,
        "updated_tasks": existing_tasks,
        "total_tasks_count": total_tasks_count
    }

@app.delete("/tasks/{email}")
async def delete_cart_item(email: str, cart_id: int):
    print("DELETE Received  email",email,"id : ",cart_id)
    print(f"Received DELETE for email: {email}, cart_id: {cart_id}")

    user_cart = taskcart_collection.find_one({"email": email})
    if not user_cart:
        raise HTTPException(status_code=404, detail="User not found")
    existing_tasks = user_cart["tasks"]  # or .get("tasks", [])
    print("Existing tasks:", existing_tasks)

    # # Convert cart_id to int to match MongoDB data
    # try:
    #     cart_id = int(cart_id)
    # except ValueError:
    #     raise HTTPException(status_code=400, detail="Invalid cart_id format")

    filtered_tasks = [task for task in existing_tasks if task["cart_id"] != cart_id]

    if len(filtered_tasks) == len(existing_tasks):
        raise HTTPException(status_code=404, detail="Task id not found")

    taskcart_collection.update_one(
        {"email": email},
        {"$set": {"tasks": filtered_tasks}}
    )

    return {
        "message": "Cart item deleted successfully",
        "updated_tasks": filtered_tasks,
    }

###########End Task########################


############password############


# JWT configuration
SECRET_KEY = "9446910978"  # Change this to a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Models
class User(BaseModel):
    email: EmailStr
    password: str

# Utility Functions
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    expire = datetime.datetime.now(datetime.timezone.utc) + expires_delta
    # expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# User Registration
@app.post("/register")
async def register(user: User):
    if usercollection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_id = usercollection.insert_one({"email": user.email, "password": hashed_password}).inserted_id
    return {"id": str(user_id), "email": user.email} # or return {"message": "User registered successfully"}


# User Login with HTTP-only cookies
@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = usercollection.find_one({"email": form_data.username})
    if not user :
        raise HTTPException(status_code=400, detail="Email is not registered.Please signup..")
    if not user or not verify_password(form_data.password, user['password']):
        raise HTTPException(status_code=400, detail="Incorrect password.Try again..")

    access_token = create_token(data={"email": user['email']}, expires_delta=datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_token(data={"email": user['email']}, expires_delta=datetime.timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    response = JSONResponse(content={"authorized": True, "message": "Successfully logged in", "username": user['email']},status_code=200)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return response


# Token Refresh
@app.post("/refresh-token")
async def refresh_token(refresh_token: Optional[str] = Cookie(None)):
    print("Received refresh_token:", refresh_token)
    if not refresh_token:
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Refresh token missing")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        new_access_token = create_token(data={"email": email}, expires_delta=datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        
        response = JSONResponse(content={"authorized": True,"message": "Access token refreshed"})
        response.set_cookie(key="access_token", value=new_access_token, httponly=True)
        return response
    except jwt.ExpiredSignatureError:
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Invalid refresh token")

# Protected Route
@app.get("/protected-endpoint")
async def protected_endpoint(access_token: Optional[str] = Cookie(None)):
    print("Received access_token:", access_token)
    if access_token is None:
        # If no access token is found, return unauthorized response
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        # Decode the JWT to extract user information
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        # Return authorization status and username (email) in the response
        return JSONResponse(content={
            "authorized": True,
            "username": payload["email"]  # Assuming 'email' is the username field
        }, status_code=200)
    except jwt.ExpiredSignatureError:
        # Handle expired token
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        # Handle invalid token
        return JSONResponse(content={"authorized": False}, status_code=401)
        # raise HTTPException(status_code=401, detail="Invalid token")
    
# Logout
# @app.post("/logout")
# async def logout(response: Response):
#     response.set_cookie(key="access_token", value="", httponly=True, expires=0)
#     response.set_cookie(key="refresh_token", value="", httponly=True, expires=0)
#     return JSONResponse(content={"message": "Logged out successfully", "authorized": False} )
#     # return {"message": "Logged out successfully", "authorized": False}  


@app.post("/logout")
async def logout(response: Response):
    # Explicitly delete cookies by setting max_age and expires
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully", "authorized": False}
    # return JSONResponse(content={"message": "Logged out successfully", "authorized": False})
   
##########password###########################3

