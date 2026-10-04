# Task 2: Jenkins CI/CD Pipeline

This is a standalone sample project for Task 2. Jenkins uses the `Jenkinsfile` to check out the code, run tests, build a Docker image, and deploy the app as a container.

## Project files

- `Jenkinsfile` - Jenkins pipeline with Checkout, Test, Build, and Deploy stages.
- `Dockerfile` - packages the app into a Docker image.
- `src/server.js` - sample Node.js web app with a `/health` endpoint.
- `test/server.test.js` - two automated app tests.

## Requirements

- A Jenkins server or cloud instance.
- Windows Jenkins with Node.js 22 or newer and Docker Desktop installed.
- Docker Desktop must be running in Linux containers mode because the Dockerfile uses `node:22-alpine`.
- The Jenkins service account must be able to run `node`, `npm`, and `docker` and access the Docker daemon.
- Port `3000` must be available because the deployed app listens on this port.

## Configure the pipeline in Jenkins

1. Create a **new GitHub repository**, for example `jenkins-demo-app`, and upload all files from this project folder. Keep `Jenkinsfile` in the repository root.
2. In Jenkins, select **New Item**, enter `jenkins-demo-app`, choose **Pipeline**, and select **OK**.
3. In the job configuration's **Pipeline** section, set **Definition** to **Pipeline script from SCM**.
4. Select **Git** for **SCM**. Enter your new repository URL, for example `https://github.com/Preksharhl/jenkins-demo-app.git`.
5. Set **Branch Specifier** to `*/main` and **Script Path** to `Jenkinsfile`. Select **Save**, then run the first build with **Build Now**.
6. On the Jenkins build page, confirm that the `Checkout`, `Test`, `Build`, and `Deploy` stages pass. The app will run on your Windows machine at <http://localhost:3000>.

The Windows `Jenkinsfile` polls the repository every two minutes and starts the pipeline when it finds a new commit. Polling can delay the trigger by up to two minutes. It uses Jenkins' Windows `bat` step, runs tests with Node.js on the Jenkins machine, and uses Docker Desktop to build and deploy the container. The Jenkins service account must have access to these programs. Jenkins recommends using a dedicated local or domain service account instead of `LocalSystem`. See the [Jenkins Windows installation guide](https://www.jenkins.io/doc/book/installing/windows/), [Docker Desktop for Windows guide](https://docs.docker.com/desktop/setup/install/windows-install/), and [Jenkins Pipeline syntax guide](https://www.jenkins.io/doc/book/pipeline/syntax/).

Before creating the Jenkins job, open Command Prompt under the Windows account used by the Jenkins service and check that `node --version`, `npm --version`, and `docker version` work. Start Docker Desktop and switch it to Linux containers if needed. The `docker version` output should include both Client and Server sections. The Jenkins service must be able to use that same Docker engine; see the service-account notes in the [Jenkins Windows installation guide](https://www.jenkins.io/doc/book/installing/windows/).

## Run locally

Requires Node.js 22 or newer.

```sh
npm test
npm start
```

Build and run the Docker image locally:

```sh
docker build -t jenkins-demo-app .
docker run --rm -p 3000:3000 jenkins-demo-app
```
