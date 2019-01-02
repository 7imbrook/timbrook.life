node("infra-jenkins-slave") {
    checkout scm
    container('infra') {
        stage("Fetch Chart Dependacies") {
            sh "helm init --client-only"
            sh "helm dep build ./deploy"
        }
    
        stage("Build Release") {
            sh 'helm package --version "1.0.${BUILD_ID}" ./deploy' 
        }
    }
    stage("Re-index remote repository") {
        sh "curl https://helm-charts.sfo2.digitaloceanspaces.com/index.yaml > index.yaml",
        sh "cat index.yaml"
        container('infra') {
            sh "helm repo index --merge index.yaml ."
            sh "cat index.yaml"
        }
    }
}