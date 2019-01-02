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

        stage("Re-index remote repository") {
            fileOperations([
                fileDownloadOperation(
                    url="https://helm-charts.sfo2.digitaloceanspaces.com/index.yaml",
                    userName="",
                    password="",
                    targetLocation=".",
                    targetFileName="index.yaml"
                )
            ])
            sh "helm repo index --merge index.yaml ."
        }

        stage("upload artifacts") {

        }
    }
}