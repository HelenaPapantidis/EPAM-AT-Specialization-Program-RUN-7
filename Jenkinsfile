pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-20'
    }
    
    environment {
        TEST_USER_EMAIL = credentials('test-user-email')
        TEST_USER_PASSWORD = credentials('test-user-password')
        BASE_URL = 'https://practicesoftwaretesting.com'
    }
    
    triggers {
        // Run every 2 hours
        cron('H */2 * * *')
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        
        stage('Lint & Format Check') {
            steps {
                bat 'npm run lint'
                bat 'npm run format:check'
            }
        }
        
        stage('UI Tests') {
            steps {
                bat 'npm run test:cypress:chrome'
            }
            post {
                always {
                    publishHTML(target: [
                        reportDir: 'cypress/mochawesome-report',
                        reportFiles: 'index.html',
                        reportName: 'Cypress Report',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }
        
        stage('API Tests') {
            steps {
                bat 'npm run test:api'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
            cleanWs()
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
