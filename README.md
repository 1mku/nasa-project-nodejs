# NASA Mission Control NodeJS Project

## Local Development

1. Set up environment variables

To get started create a `.env` configuration file a nd set environment variables.

```
cp .env.example .env
```

2. Install and run a project

```
pnpm install
pnpm dev
```

## Build a docker image and push to Docker Hub

```
docker build -t repo-name/nasa-project-nodejs:tag --platform linux/amd64 .
```

```
docker push repo-name/nasa-project-nodejs:tag
```

### Deploying to Amazon EC2

1. Update packages: `sudo yum update -y`
2. Install Docker: `sudo yum install docker`
3. Start a docker service: `sudo service docker start`

   To run docker without sudo command, add ec2-user to the docker permission group:

   ```
   sudo usermod -a -G docker ec2-user
   ```

4. Login to the Docker Hub: `docker login...`
5. Run a docker image:

   ```
   docker run --restart=always -p 80:8000 repo-name/nasa-project-nodejs:tag
   ```
