"use strict";
const Project = require('../models/project');
const IssueList = require('../models/issueList');
const Key = require('../models/key');
const CommitDate = require('../models/commitDate');
const History = require('../models/history');
const File = require('../models/fileHistory');
const Architecture = require('../models/architecture');
const Categorization = require('../models/categorization');
const Issue = require('../models/issue');

module.exports = function (app) {

    app.get('/locs', function (req, res) {
        Project.find(function (err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/issues', function (req, res) {
        IssueList.find(function (err, issues) {
            if (err)
                return res.send(err);
            res.json(issues);
        });
    });

    app.get('/keys', function (req, res) {
        Key.find(function (err, keys) {
            if (err)
                return res.send(err);
            res.json(keys);
        });
    });

    app.get('/dates', function (req, res) {
        CommitDate.find(function (err, dates) {
            if (err)
                return res.send(err);
            res.json(dates);
        });
    });

    app.get('/history', function (req, res) {
        History.find(function (err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/files', function (req, res) {
        File.find(function (err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/architecture', function (req, res) {
        Architecture.find(function (err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/categorization', function (req, res) {
        Categorization.find(function (err, projects) {
            if (err)
                return res.send(err);
            res.json(projects);
        });
    });

    app.get('/issuesDetail', function (req, res) {
        Issue.find(function (err, issues) {
            if (err)
                return res.send(err);
            res.json(issues);
        });
    });

    app.post('/issues', function (req, res) {
        IssueList.remove({}, (err) => {
            if (err)
                return res.send(err);
            IssueList.collection.insert(req.body, (err, issues) => {
                if (err)
                    return res.send(err);
                res.json(issues);
            });
        });
    });

    app.post('/locs', function (req, res) {
        let project = new Project();

        project.name = req.body.name;
        project.locs = req.body.locs;

        project.save(function (err) {
            if (err)
                return res.send(err);

            res.json(project);
        });
    });

    app.post('/history', function (req, res) {
        let project = new History();

        project.name = req.body.name;
        project.data = req.body.data;

        project.save(function (err) {
            if (err)
                return res.send(err);

            res.json(project);
        });
    });

    app.post('/files', function (req, res) {
        let project = new File();

        project.name = req.body.name;
        project.data = req.body.data;

        project.save(function (err) {
            if (err)
                return res.send(err);

            res.json(project);
        });
    });


    app.post('/dates', function (req, res) {
        let project = new CommitDate();

        project.name = req.body.name;
        project.dates = req.body.dates;

        project.save(function (err) {
            if (err)
                return res.send(err);

            res.json(project);
        });
    });


    app.post('/keys', function (req, res) {
        let key = new Key();

        key.name = req.body.name;
        key.key = req.body.key;

        key.save(function (err) {
            if (err)
                return res.send(err);

            res.json(key);
        });
    });

    app.put('/locs/:name', function (req, res) {
        Project.findOne({name: req.params.name}, function (err, project) {
            if (err) {
                return res.send(err);
            }

            if (!project) {
                let p = new Project();
                p.name = req.params.name;
                p.locs = [req.body.locs];
                p.save(function (err) {
                    if (err)
                        return res.send(err);

                    return res.json(p);
                });
            } else {
                project.name = req.body.name || project.name;
                if (req.body.locs)
                    project.locs.push(req.body.locs);

                project.save(function (err) {
                    if (err)
                        return res.send(err);

                    res.json(project);
                });
            }
        });
    });


    app.put('/dates/:name', function (req, res) {
        CommitDate.findOne({name: req.params.name}, function (err, project) {
            if (err) {
                return res.send(err);
            }

            if (!project) {
                let c = new CommitDate();
                c.name = req.params.name;
                c.dates = [req.body.dates];
                c.save(function (err) {
                    if (err)
                        return res.send(err);

                    return res.json(c);
                });
            } else {
                project.name = req.body.name || project.name;
                if (req.body.dates)
                    project.dates.push(req.body.dates);

                project.save(function (err) {
                    if (err)
                        return res.send(err);

                    res.json(project);
                });
            }
        });
    });

    app.put('/history/:name', function (req, res) {
        History.findOne({name: req.params.name}, function (err, project) {
            if (err) {
                return res.send(err);
            }

            if (!project) {
                let p = new History();
                p.name = req.params.name;
                p.data = [req.body.data];
                p.save(function (err) {
                    if (err)
                        return res.send(err);

                    return res.json(p);
                });
            } else {
                project.name = req.body.name || project.name;
                const oldDataIndex = project.data.findIndex(d => d.commitId === req.body.data.commitId);
                if (req.body.data && oldDataIndex !== -1)
                    project.data[oldDataIndex] = req.body.data;
                if (req.body.data && oldDataIndex === -1)
                    project.data.push(req.body.data);
                project.save(function (err) {
                    if (err)
                        return res.send(err);
                    res.json(project);
                });
            }
        });
    });

    app.put('/files/:name', function (req, res) {
            File.findOne({name: req.params.name}, function (err, project) {
                if (err) {
                    return res.send(err);
                }
                let newData;
                if (!project) {
                    let p = new File();
                    p.name = req.params.name;
                    p.data = [req.body.data];
                    newData = req.body.data;
                    p.save(function (err) {
                        if (err)
                            return res.send(err);
                    });
                } else {
                    project.name = req.body.name || project.name;
                    newData = req.body.data || req.body;
                    const oldDataIndex = project.data.findIndex(d => d.commitId === newData.commitId);
                    if (oldDataIndex !== -1) {
                        project.data.set(oldDataIndex, newData);
                    } else {
                        project.data.push(newData);
                    }
                    project.markModified("AddedSocial");
                    project.save(function (err) {
                        if (err)
                            return res.send(err);
                    });
                }
                addIssuesDetail.then(() => res.json(newData)).catch(() => res.send(err))
            });
        }
    );

    function addIssuesDetail(newData) {
        return new Promise(function (fulfill, reject) {
            newData.files.map(file => {
                file.issuesDetail && file.issuesDetail.forEach(d => {
                    Issue.findOne({id: d.id}, function (err, issue) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (!issue) {
                            let i = new Issue();
                            i.id = d.id;
                            i.rule = d.rule;
                            i.description = d.description;
                            i.save(function (err) {
                                if (err)
                                    reject(err);
                            });
                        }
                    });
                })
            });
            fulfill(newData);
        });
    }

    app.put('/architecture/:name', function (req, res) {
        Architecture.findOne({name: req.params.name}, function (err, project) {
            if (err) {
                return res.send(err);
            }
            if (!project) {
                let p = new Architecture();
                p.name = req.params.name;
                p.repo = req.body.repo;
                p.children = req.body.children;
                p.save(function (err) {
                    if (err)
                        return res.send(err);

                    return res.json(p);
                });
            } else {
                project.name = req.body.name || project.name;
                project.repo = req.body.repo || project.repo;
                project.children = req.body.children || project.children;

                project.save(function (err) {
                    if (err)
                        return res.send(err);
                    res.json(project);
                });
            }
        });
    });

    app.put('/categorization/:name', function (req, res) {
        Categorization.findOne({name: req.params.name}, function (err, project) {
            if (err) {
                return res.send(err);
            }
            if (!project) {
                let p = new Categorization();
                p.name = req.params.name;
                p.decisions = req.body.decisions || req.body;
                p.save(function (err) {
                    if (err)
                        return res.send(err);

                    return res.json(p);
                });
            } else {
                project.name = req.body.name || project.name;
                project.decisions = req.body.decisions || req.body || project.decisions;

                project.save(function (err) {
                    if (err)
                        return res.send(err);
                    res.json(project);
                });
            }
        });
    });
};
