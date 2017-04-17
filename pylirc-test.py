#!/usr/bin/python

import pylirc

pylirc.init( 'pylirc', './pylirc.conf', 0 )

while ( True ) :
	s = pylirc.nextcode( 1 )
	command = None
	if ( s ) :
		for ( code ) in s :
			print( code["config"] )
