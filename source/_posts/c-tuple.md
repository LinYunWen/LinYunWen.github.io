---
title: C++ tuple
date: 2020-11-07 15:53:13
tags: [note, c/c++, tuple]
---

# C++ tuple
> For returning two values I use a `std::pair` (usually typedef'd). You should look at `boost::tuple` (in C\+\+11 and newer, there's `std::tuple`) for more than two return results.
> With introduction of structured binding in C\+\+ 17, returning `std::tuple` should probably become accepted standard.
<!--more-->

```c++
#include <tuple>
std::tuple<int, int> divide(int dividend, int divisor) {
    return  std::make_tuple(dividend / divisor, dividend % divisor);
}

#include <iostream>
int main() {
    using namespace std;
    int quotient, remainder;
    tie(quotient, remainder) = divide(14, 3);
    cout << quotient << ',' << remainder << endl;
}

```

In C++17:

```c++
#include <tuple>
std::tuple<int, int> divide(int dividend, int divisor) {
    return  {dividend / divisor, dividend % divisor};
}

#include <iostream>
int main() {
    using namespace std;
    auto [quotient, remainder] = divide(14, 3);
    cout << quotient << ',' << remainder << endl;
}
```

or with structs
```c++
auto divide(int dividend, int divisor) {
    struct result {int quotient; int remainder;};
    return result {dividend / divisor, dividend % divisor};
}

#include <iostream>
int main() {
    using namespace std;
    auto result = divide(14, 3);
    cout << result.quotient << ',' << result.remainder << endl;
    // or
    auto [quotient, remainder] = divide(14, 3);
    cout << quotient << ',' << remainder << endl;
}
```

## Reference
- [Returning multiple values from a C++ function](https://stackoverflow.com/questions/321068/returning-multiple-values-from-a-c-function)