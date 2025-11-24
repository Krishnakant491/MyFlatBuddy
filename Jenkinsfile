pipeline {
    agent any

    environment {
        SONARQUBE = 'sonar-imcc-2401060'
        IMAGE_NAME = "mern-common-app"
        REGISTRY = "nexus.imcc.com:8082"
        DOCKER_HOST = "tcp://localhost:2375"
    }

    stages {

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE) {
                    script {
                        def scannerHome = tool 'sonar-scanner'
                        sh """
                            export SONAR_SCANNER_OPTS="-Xmx512m"
                            ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=mern \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=http://sonarqube.imcc.com/ \
                                -Dsonar.login=student
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Push to Nexus Registry') {
            steps {
                sh """
                docker login ${REGISTRY} -u student -p Imcc@2025
                docker tag ${IMAGE_NAME}:latest ${REGISTRY}/${IMAGE_NAME}:latest
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
