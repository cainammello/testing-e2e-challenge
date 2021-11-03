# Test Coding Challenge

## Problem Description

A [**Harshad number**](https://en.wikipedia.org/wiki/Harshad_number) is a number which 
is divisible by the sum of its digits. For example, `132` is divisible by `6` (1+3+2).  
A subset of the **Harshad numbers** are the **Moran numbers**. **Moran numbers** 
yield a prime when divided by the sum of their digits. For example, `133` divided by `7`
 (1+3+3) yields `19`, a prime.

### Requirements

- Create functional tests that validates the correct responses of this HTTP server: 
    - `"M"` if the request is a **Moran number**
    - `"H"` if the resquest is a **Harshad number** (non-Moran)
    - `"N"` if the request is neither.

- The server should be able to process `uint16_t`, `int32_t`, `std::string`, and `float` 
  values in the request. Floating point numbers should be rounded to the nearest integer 
  value to perform the calculation
    - `"http://localhost:80/moran/i32/<value_number>"` for `int32_t`
    - `"http://localhost:80/moran/u16/<value_number>"` for `uint16_t`
    - `"http://localhost:80/moran/float/<value_number>"` for `float`
    - `"http://localhost:80/moran/string/<value_number>"` for `std::string`.

- Functional tests should be created in order to:
    - Validate all numbers between 0-1000.
  It's up to you to choose the testing framework that allows you to create functional tests for this API. 
  We expect an explanation how to run the tests in the `README.md` test section and some description about your decisions, as: testing framework, test specifications, etc.

> **NOTE:**
>>
> The server is already implemented and must be used. However, it might contain a few problems, errors and/or missing validations we commonly see with submitted code.
Some are simple problems and should jump out at you and others are problems because of inadequate testing.
> We want you to find these problems throught testing methodologies and for this you can choose the testing framework that best suits. 
>
> We're looking to see how you prove the quality of the code, approach **testing** and measure **quality** to the overall system.

### Example

```
moran(132)    ➞ "H"
moran(133.25) ➞ "M"
moran("134")  ➞ "N"
```

## Execution

## Build

The following `make` command will build the application. Please note that this process may take a while depending on the Internet bandwidth.

``` bash
 > make
docker build -t interview-testing:latest .
.
.
Successfully built 6b22ebe5f5f8
Successfully tagged interview-testing:latest
```

## Run

The following `docker` command will execute the aplication.

``` bash
 > docker run -p 80:80 interview-testing
The service is up and running.

```

## Use

Client

``` bash
 > curl -w'\n' -v -XGET 'http://localhost:80/moran/i32/1000'
*   Trying 127.0.0.1:80...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 80 (#0)
> GET /moran/i32/1000 HTTP/1.1
> Host: localhost
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Connection: close
< Content-Length: 1
< 
* Closing connection 0
H
 > curl -w'\n' -v -XGET 'http://localhost:80/moran/u16/888'
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 127.0.0.1:80...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 80 (#0)
> GET /moran/u16/888 HTTP/1.1
> Host: localhost
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Connection: close
< Content-Length: 1
< 
* Closing connection 0
M
```

## Test



