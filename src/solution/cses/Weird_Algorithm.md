## Weird Algorithm [problem](https://cses.fi/problemset/task/1068)

### Description
基本上就是照著題目的要求做模擬即可。

### Tags
- simulation
- implementation

### Code
``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
int main(){
    fastio;
    LL N; cin>>N;
    cout << N;
    while(N != 1){
        if(N&1){
            N = N*3;
            N++;
        } else{
            N >>= 1;
        }
        cout << ' ' << N;
    }
}
```