# Use official Python image as base
FROM python:3.13.5-bookworm

# Set working directory
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy application code
COPY . .

# Install dependencies
RUN pipenv install

# Set default command (update as needed)
CMD ["pipenv", "run", "python", "main.py"]