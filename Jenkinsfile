pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'sonar-imcc'     // Jenkins → Configure System → SonarQube Server Name
        IMAGE_NAME = "mern-common-app"
        REGISTRY = "nexus.imcc.com:8082"
        SONAR_URL = "http://sonarqube.imcc.com/"
        SONAR_LOGIN = "student"
        SONAR_PASSWORD = "Imccstudent@2025"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Krishnakant491/MyFlatBuddy.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        sh """
                        sonar-scanner \
                          -Dsonar.projectKey=mern \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=${SONAR_URL} \
                          -Dsonar.login=${SONAR_LOGIN}
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Nexus Registry') {
            steps {
                sh """
                docker tag ${IMAGE_NAME}:latest ${REGISTRY}/${IMAGE_NAME}:latest
                docker login ${REGISTRY} -u student -p Imcc@2025
                docker push ${REGISTRY}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                docker stop mern-container || true
                docker rm mern-container || true

                docker run -d \
                  --name mern-container \
                  -p 80:5000 \
                  ${REGISTRY}/${IMAGE_NAME}:latest
                """
            }
        }
    }
}
