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

# The program to use to edit the cache.
CMAKE_EDIT_COMMAND = /usr/bin/cmake-gui

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/leonie/UDPMira

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/leonie/UDPMira/build/debug

# Utility rule file for UDPMiraReceiver_manifest.

# Include the progress variables for this target.
include domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/progress.make

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest: ../../domains/UDPMiraDomain/ManifestGen
	cd /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain && /opt/MIRA/bin/ManifestGen -P MIRABase MIRAFramework /usr/lib/x86_64-linux-gnu/libboost_date_time.so /usr/lib/x86_64-linux-gnu/libboost_thread.so /usr/lib/x86_64-linux-gnu/libboost_system.so /usr/lib/x86_64-linux-gnu/libboost_filesystem.so /usr/lib/x86_64-linux-gnu/libboost_regex.so /usr/lib/x86_64-linux-gnu/libboost_program_options.so /usr/lib/x86_64-linux-gnu/libboost_iostreams.so xml2 ssl crypto z pthread opencv_core sqlite3 /usr/lib/x86_64-linux-gnu/libiberty.a /usr/lib/libbfd.so /usr/lib/x86_64-linux-gnu/libiberty.a dl MIRABase -L UDPMiraReceiver -T /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain/UDPMiraReceiver.manifest -D /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain/UDPMiraReceiver -S -F

UDPMiraReceiver_manifest: domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest
UDPMiraReceiver_manifest: domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/build.make
.PHONY : UDPMiraReceiver_manifest

# Rule to build all files generated by this target.
domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/build: UDPMiraReceiver_manifest
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/build

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/clean:
	cd /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain && $(CMAKE_COMMAND) -P CMakeFiles/UDPMiraReceiver_manifest.dir/cmake_clean.cmake
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/clean

domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/depend:
	cd /home/leonie/UDPMira/build/debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/leonie/UDPMira /home/leonie/UDPMira/domains/UDPMiraDomain /home/leonie/UDPMira/build/debug /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain /home/leonie/UDPMira/build/debug/domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : domains/UDPMiraDomain/CMakeFiles/UDPMiraReceiver_manifest.dir/depend

