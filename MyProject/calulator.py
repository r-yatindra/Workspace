from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import math
import os

app = FastAPI()

class CalculationRequest(BaseModel):
    expression: str

class CalculationResponse(BaseModel):
    result: float | None
    error: str | None = None

@app.get("/")
async def serve_root():
    return FileResponse("static/index.html")

@app.post("/api/calc")
async def calculate(request: CalculationRequest):
    try:
        # Safe evaluation - only allows math expressions
        allowed_names = {name: getattr(math, name) for name in dir(math) if not name.startswith("_")}
        allowed_names.update({"abs": abs, "round": round, "pow": pow, "max": max, "min": min})
        
        result = eval(request.expression, {"__builtins__": {}}, allowed_names)
        return CalculationResponse(result=float(result))
    except Exception as e:
        return CalculationResponse(result=None, error=str(e))

# Mount static files
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)