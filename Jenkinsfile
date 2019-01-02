node("infra-jenkins-slave") {
    stage("Build Release")
    checkout scm
    container('infra') {
       sh "helm verify ./deploy" 
    }
}