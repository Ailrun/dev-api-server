# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### [1.2.0] - 2018-07-12

### Added
- Add cors middleware

### Fixed
- Fix wrong @types dependencies

## [1.1.0] - 2018-07-11

### Added
- filePath of Serving APIs now accept path-to-regexp like strings.

### Fixed
- File serving is now work
  Internally, file path is changed to absolute path, but Koa option for handling absolute path was not added.

## 1.0.0 - 2018-07-10

### Initialize
- dev-api-server executable

[Unreleased]: https://github.com/Ailrun/dev-api-server/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/Ailrun/dev-api-server/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Ailrun/dev-api-server/compare/v1.0.0...v1.1.0
