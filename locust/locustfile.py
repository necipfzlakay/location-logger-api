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
        response = self.client.post("/users/create", 
                                    json={"username": str(random.randint(1, 1000))  })
        print(f"User created with id: {response.json()}")
        self.user_id = response.json().get("id") 
       

    def createAreas(self): 
        response = self.client.get("/areas/custom")
        print(f"New Area: {response.json()}")
       

    def generate_random_location(self):
        min_lat = 41.000000
        max_lat = 42.000000
        min_lon = 28.000000
        max_lon = 29.000000
        lat = random.uniform(min_lat, max_lat)  # Rastgele latitude
        long = random.uniform(min_lon, max_lon)  # Rastgele longitude
        return [lat, long]

    @task
    def getLocation(self):
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
  
