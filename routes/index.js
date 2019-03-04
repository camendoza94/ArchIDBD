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
                let project = new Project();
                project.name = req.params.name;
                project.locs = [req.body.locs];
                project.save(function(err2) {
                    if (err2)
                        return res.send(err2);

                    return res.json(project);
                });
            }

            project.name = req.body.name || project.name;
            if(req.body.locs)
                project.locs.push(req.body.locs);

            project.save(function(err) {
                if (err)
                    return res.send(err);

                res.json(project);
            });
        });
    });
}
