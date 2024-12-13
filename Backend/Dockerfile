# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy dependencies and install
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --no-input

# Expose the port for Django
EXPOSE 8000

# Command to run the Django application
CMD ["gunicorn", "Backend.wsgi:application", "--bind", "0.0.0.0:8000"]
