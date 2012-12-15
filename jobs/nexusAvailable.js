var nodeio = require('node.io')
var Job = {}

Job.name = "Google Nexus 4 Availability"
Job.msg = 'fetching from Play Store ...'
Job.enabled = true
Job.status = 'building'
Job.interval = 1000*60*5
Job.timestamp = ''
Job.func = function( callback ) {
	var job  = new nodeio.Job({
		input:	false,
		run:	function(){
			this.getHtml( 
				'https://play.google.com/store/devices/details?id=nexus_4_16gb',
				function( err, $ ) {
					if(err) {
						callback(err, null)
					} else {
						// this is fragile, because when it is available, this span doesn't exist!
						var t = $('span.hardware-price-description').fulltext
						callback( null, {
							msg: t,
							status: 'success',
							timestamp: new Date()
						})
					}
				}
			)
		}
	})
	
	nodeio.start( job, { silent: true })
}
module.exports = Job

