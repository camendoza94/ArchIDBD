"use strict";
const Project = require('../models/project');

module.exports = function(app) {

    app.get('/locs', function(req, res) {
        Project.find(function(err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.post('/locs', function(req, res) {
        let project = new Project();

        project.name = req.body.name;
        project.locs = req.body.locs;

        project.save(function(err) {
            if (err)
                return res.send(err);

            res.json(project);
        });
    });

    app.put('/locs/:name', function(req, res) {
        Project.findOne({ name: req.params.name }, function(err, project) {
            if (err) {
                 return res.send(err);

            }

            if(!project) {
            	let p = new Project();
                p.name = req.params.name;
                p.locs = [req.body.locs];
                p.save(function(err) {
                    if (err)
                        return res.send(err);

                    return res.json(p);
                });
            } else {
	            project.name = req.body.name || project.name;
	            if(req.body.locs)
	                project.locs.push(req.body.locs);

	            project.save(function(err) {
	                if (err)
	                    return res.send(err);

	                res.json(project);
	            });
       		}
        });
    });
}
