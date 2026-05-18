#!groovy

node('EJ2Angularlatest') {
    try {
        deleteDir()

        stage('Import') {
            git url: 'https://gitea.syncfusion.com/essential-studio/ej2-groovy-scripts.git', branch: 'master', credentialsId: env.GiteaCredentialID;
            shared = load 'src/shared.groovy'
        }

        stage('Checkout') {
            checkout scm
            shared.getProjectDetails()
            shared.gitlabCommitStatus('running')
        }

        stage('Install') {
            shared.install()
        }

        stage('Build') {
            // shared.test()
            sh 'npm run doc-build'
        }

        stage('Publish') {
            shared.publish()
        }

        shared.gitlabCommitStatus('success')
        deleteDir()
    }
    catch(Exception e) {
        shared.throwError(e)
        println(e)
        shared.gitlabCommitStatus('failed')
        sh 'gulp ci-report-mail --option Failure'
        deleteDir()
        error('Build Failed')
    }
}
