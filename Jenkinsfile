pipeline {
    agent any

    // Poll the source repository every two minutes and build when a new commit appears.
    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        IMAGE_NAME = 'jenkins-demo-app'
        CONTAINER_NAME = 'jenkins-demo-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                bat 'node --version && npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% >NUL 2>&1 & docker run -d --name %CONTAINER_NAME% --restart unless-stopped -p 3000:3000 %IMAGE_NAME%:latest'
            }
        }
    }

    post {
        success {
            echo 'Build, tests, and deployment completed successfully.'
        }
        failure {
            echo 'The pipeline failed. Check the Jenkins console log for the error.'
        }
    }
}
