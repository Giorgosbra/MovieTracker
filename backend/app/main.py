from fastapi import FastAPI

app = FastAPI(
    title="MovieTracker API",
    description="REST API for the MovieTracker application",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Welcome to the MovieTracker API!"}