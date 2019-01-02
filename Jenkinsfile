node("infra-jenkins-slave") {
    checkout scm
    container('infra') {
        stage("Fetch Chart Dependacies") {
            sh "helm init --client-only"
            sh "helm dep build ./deploy"
        }
    
        stage("Build Release") {
            sh "helm package ./deploy" 
        }
    }
}