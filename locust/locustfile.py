from locust import HttpUser, TaskSet, task, between, FastHttpUser
import random 


class UserBehavior(TaskSet):
    def on_start(self):
        """ create user and areas on start """
        self.createUser()
        self.createAreas()
    def on_stop(self):
        """ get saved logs on stop """
        self.getLogs()

    def getLogs(self):
        self.client.get("/logs")
    
    def createUser(self): 
        try:
            # if user already exists, get user id from database or create new user
            users_response = self.client.get("/users")
            users = users_response.json()
            print(f"Users: {users}")
            
            if users_response.status_code == 200 and isinstance(users, list) and len(users) > 0:
                self.user_id = users[0].get("id")
            else:
                response = self.client.post("/users/create", 
                                            json={"username": str(random.randint(1, 1000))  })
                print(f"User created with id: {response.json()}")
                self.user_id = response.json().get("id") 
        except Exception as e:
            print(f"Error in createUser: {e}")
            self.user_id = None

    def createAreas(self): 
        try:
            response = self.client.get("/areas/custom")
            print(f"New Area: {response.json()}")
        except Exception as e:
             print(f"Error in createAreas: {e}")
             self.area_id = None
       
    ## Create random location in Istanbul area
    def generate_random_location(self):
        # 28.6676645
        # 28.5054982
        # 41.3528775
        # 40.9824373
        min_lat = 40.800000
        max_lat = 41.500000
        min_lon = 28.000000
        max_lon = 29.400000
        lat = random.uniform(min_lat, max_lat)  # Rastgele latitude
        long = random.uniform(min_lon, max_lon)  # Rastgele longitude
        return [lat, long]

    @task
    def getLocation(self):
        if not hasattr(self, 'user_id') or self.user_id is None:
            print("User ID not set, skipping task")
            return
            
        # 29.349892 
        print(f"User ID: {self.user_id} ")
        location = self.generate_random_location()
        print(location[0])
        response = self.client.post("/locations",
                                    json={
                                        "user_id": self.user_id, 
                                        "lat": location[0], 
                                        "long": location[1] 
                                        })
        if response.status_code == 201:
            print(f"Location: {response.json()}")
        else:
            print(f"Error: {response.json()}")
   
   

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1,2)
  
