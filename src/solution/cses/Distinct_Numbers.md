## Distinct Numbers [problem](https://cses.fi/problemset/task/1621)

### Description
```
題目: 計算序列中有幾個不同的元素
```

```
解法1 : 可使用 std::set 的特性，也就是 set 中只會保留唯一的元素，可以自動去重

解法2 : 可使用 std::unorder_map，也就是用 hashing 來統計共出現了幾個不同的元素
```
### tags
- Sorting-and-Searching 
- Set 
- Hashing 

### Code
``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE 5*int(1e2)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<int, int> pii;
 
int main(){
    fastio;
    LL N;
    cin >> N;
    set<LL> s;
    while(N--){
        LL tmp; cin >> tmp;
        s.insert(tmp);
    }
 
    cout << s.size();
}
```