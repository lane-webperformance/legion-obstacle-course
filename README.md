
Obstacle Course
---------------

[![Build Status](https://travis-ci.org/lane-webperformance/legion-obstacle-course.svg?branch=master)](https://travis-ci.org/lane-webperformance/legion-obstacle-course)
[![Dependency Status](https://gemnasium.com/badges/github.com/lane-webperformance/legion-obstacle-course.svg)](https://gemnasium.com/github.com/lane-webperformance/legion-obstacle-course)

Legion's Obstacle Course is a simple express.js server. Included are a variety
of practice tasks. These tasks can be used to test Legion's functionality or
as training tasks for new users.

Get detailed [documentation](./DOCUMENTATION.txt) about the tasks by
requesting / from the server.

### Http Obstacle Course

Start the server by running:

	obstacle-course --http

or run it programatically from within another library by calling:

	require('legion-obstacle-course').http.listen(port);

The arguments and return value for listen() are exactly the same
as the express.js method of the same name.

### TCP Obstacle Course

There's also a TCP echo server.

	obstacle-course --tcp-echo

or

	require('legion-obstacle-course').tcp.echo.listen(port)
