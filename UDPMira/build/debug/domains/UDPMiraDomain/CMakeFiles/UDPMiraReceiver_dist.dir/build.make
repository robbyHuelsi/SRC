# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 2.8

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list

# Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/leonie/MIRA-Projects/RemoteControl/UDPMira

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug

# Utility rule file for UDPMiraReceiver_dist.

# Include the progress variables for this target.
include domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/progress.make

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist:

UDPMiraReceiver_dist: domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist
UDPMiraReceiver_dist: domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/build.make
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E make_directory /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E remove /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib/libUDPMiraReceiver.so
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E create_symlink ../build/debug/domains/UDPMiraDomain/libUDPMiraReceiver.so /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib/libUDPMiraReceiver.so
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E make_directory /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E remove /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib/UDPMiraReceiver.manifest
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && /usr/bin/cmake -E create_symlink ../build/debug/domains/UDPMiraDomain/UDPMiraReceiver.manifest /home/leonie/MIRA-Projects/RemoteControl/UDPMira/lib/UDPMiraReceiver.manifest
.PHONY : UDPMiraReceiver_dist

# Rule to build all files generated by this target.
domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/build: UDPMiraReceiver_dist
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/build

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/clean:
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain && $(CMAKE_COMMAND) -P CMakeFiles/UDPMiraReceiver_dist.dir/cmake_clean.cmake
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/clean

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/depend:
	cd /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/leonie/MIRA-Projects/RemoteControl/UDPMira /home/leonie/MIRA-Projects/RemoteControl/UDPMira/domains/UDPMiraDomain /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain /home/leonie/MIRA-Projects/RemoteControl/UDPMira/build/debug/domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_dist.dir/depend

