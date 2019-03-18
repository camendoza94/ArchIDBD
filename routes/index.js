"use strict";
const Project = require('../models/project');
const IssueList = require('../models/issueList');

module.exports = function(app) {

    app.get('/locs', function(req, res) {
        Project.find(function(err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/issues', function(req, res) {
        IssueList.find(function(err, issues) {
            if (err)
                return res.send(err);
            res.json(issues);
        });
    });

    app.post('/issues', function(req, res) {
        IssueList.remove({}, (err)=> {
            if(err)
                return res.send(err);
            IssueList.collection.insert(req.body, (err, issues) => {
                if(err)
                    return res.send(err);
                res.json(issues);
            });
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
