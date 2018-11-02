pipeline
{
  agent any
  stages
  {
    stage('Git')
    {
      steps
      {
        git branch: 'master',
            credentialsId: 'code.adamo.es',
            url: 'ssh://git@code.adamo.es:7999/sup/event-bus.git'
      }
    }
    stage('Notification')
    {
      steps
      {
        sh 'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#dev-notifications\\", \\"icon_emoji\\": \\":jenkins:\\", \\"username\\": \\"$JOB_NAME → Deploy\\", \\"text\\": \\"$BUILD_URL\\"}" https://hooks.slack.com/services/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'
      }
    }
    stage('Test')
    {
      agent
      {
        docker
        {
          image 'node:10.5-jessie'
        }
      }
      steps
      {
        withNPM(npmrcConfig:'ad2f541a-5eff-483a-a4e2-c3b4616a6b68')
        {
          sh 'node --version'
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Build')
    {
      steps
      {
        script
        {
          image = "registry.adamo.es:5000/adamo/$JOB_NAME:$GIT_COMMIT"
        }
        sh "docker build -t ${image} ."
      }
    }
    stage('Deploy')
    {
      steps
      {
        input message: "Deploy?"

        sh "docker push ${image}"
        sh "docker service create --with-registry-auth --mode global --network adamo --name $JOB_NAME ${image} || docker service update --with-registry-auth --image ${image} $JOB_NAME"
      }
    }
  }
  post
  {
    fixed
    {
      sh 'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#dev-notifications\\", \\"icon_emoji\\": \\":jenkins_strong:\\", \\"username\\": \\"$JOB_NAME → Deploy fixed\\", \\"text\\": \\"$BUILD_URL\\"}" https://hooks.slack.com/services/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'
    }
    success
    {
      sh 'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#dev-notifications\\", \\"icon_emoji\\": \\":jenkins_docker:\\", \\"username\\": \\"$JOB_NAME → Deploy success\\", \\"text\\": \\"$BUILD_URL\\"}" https://hooks.slack.com/services/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'
    }
    failure
    {
      sh 'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#dev-notifications\\", \\"icon_emoji\\": \\":jenkins_devil:\\", \\"username\\": \\"$JOB_NAME → Deploy fail\\", \\"text\\": \\"$BUILD_URL\\"}" https://hooks.slack.com/services/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'
    }
    aborted
    {
      sh 'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#dev-notifications\\", \\"icon_emoji\\": \\":docker_dead:\\", \\"username\\": \\"$JOB_NAME → Deploy abort\\", \\"text\\": \\"$BUILD_URL\\"}" https://hooks.slack.com/services/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'
    }
  }
}
