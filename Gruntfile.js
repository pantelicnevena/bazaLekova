module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docular: {
      baseUrl: 'http://localhost:8000',
      groups: [
        {
          groupTitle: 'Registar lekova',
          groupId: 'registar-lekova',
          sections: [
            {
              id: 'lbServices',
              title: 'lbServises',
              scripts: [ 'client/lbServices.js' ]
            }
          ]
        }
      ],
      showDocularDocs: true,
      showAngularDocs: true
    }
  });
  // Load the plugin that provides the "docular" tasks.
  grunt.loadNpmTasks('grunt-docular');

// Default task(s).
  grunt.registerTask('default', ['docular']);

};
