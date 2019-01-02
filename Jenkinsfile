node("infra-jenkins-slave") {
    checkout scm
    container('infra') {
        stage("Fetch Chart Dependacies") {
            sh "helm init --client-only"
            sh "helm dep build ./deploy"
        }

        sh '''
        export BUILD_VERSION=0.1.$(($BUILD_NUMBER - 24))
        '''
    
        stage("Build Release") {
            sh 'helm package --version "${BUILD_VERSION}" ./deploy' 
        }
    }
    stage("Re-index remote repository") {
        withAWS(credentials: "DOSpaces", endpointUrl:'https://sfo2.digitaloceanspaces.com/') {
            s3Download(file: "index.yaml", bucket: "helm-charts", path: "index.yaml", force: true)
            container('infra') {
                sh "helm repo index --merge index.yaml ."
            }
            s3Upload(
                bucket: "helm-charts",
                file: "deploy-${BUILD_VERSION}.tgz"
            )
            s3Upload(
                bucket: "helm-charts",
                file: "index.yaml"
            )
        }
    }
}