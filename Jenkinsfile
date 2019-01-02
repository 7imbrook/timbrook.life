node("infra-jenkins-slave") {
    stage("Test Infra Container")
    container('infra') {
        sh "helm ls"
    }
}