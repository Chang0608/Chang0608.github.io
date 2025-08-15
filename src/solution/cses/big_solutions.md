# Mathematics(37 題)
## Josephus Queries [problem](https://cses.fi/problemset/task/2164)
```markdown
題目: 

- 給定多組查詢，每組查詢給你 n 和 k。
- 問：在一個大小為 n 的圓圈裡進行 Josephus 問題，每次從當前人開始數第 2 個人並淘汰，問最後第 k 
  個人是誰（1-indexed）。
- 這題是 k 給定，問第 k 個人會坐在哪個位置。
```
``` markdown
解法 : 

### 1. Josephus 的遞迴解法（kill step = 2）：
   - 用經典的 Josephus 遞迴方式推導：
     - 若 k ≤ ⌈n/2⌉，表示第 k 人還活著，位置會被平移到偶數位：
       - 若 2k > n，需對 n 取模（環狀），結果為 2k % n。
       - 否則，結果就是 2k。
     - 若 k > ⌈n/2⌉，表示第 k 人在淘汰之後的子問題中，重編號求解：
       - 遞迴轉為求 f(n/2, k - ⌈n/2⌉)。
       - 根據 n 為奇或偶，平移量不同：
         - 若 n 為奇，結果為 2×f + 1。
         - 若 n 為偶，結果為 2×f − 1。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL f(LL n,LL k)
{
    if(n==1) return 1;
    if(k<=(n+1)/2) 
    {
        if(2*k>n) return (2*k)%n;
        else return 2*k;
    }
    LL temp=f(n/2,k-(n+1)/2);
    if(n%2==1) return 2*temp+1;
    return 2*temp-1;
}
 
int main(){
    fastio;
    int T;
    cin >> T;
    while (T--) {
        int n, k;
        cin >> n >> k;
        cout<< f(n,k) <<"\n";
    }
}
```

## Exponentiation [problem](https://cses.fi/problemset/task/1095)
```markdown
題目: 

- 給定多組查詢，每次輸入兩個整數 n 和 k。
- 請輸出 n^k mod 10^9+7 的值。
- 數據範圍允許 k 非常大，因此不能使用暴力乘法。
```
``` markdown
解法 : 

### 1. 快速冪（Binary Exponentiation）：
   - 利用指數的二進位展開，讓每次乘法都只在必要時做：
     - f(n, k) = f(n, k/2)^2 若 k 為偶數。
     - 若 k 為奇數，則再乘上 n。
   - 每一步都取 mod 可保證數值不爆炸。
   - 時間複雜度為 O(log k)，非常高效。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL f(LL n,LL k)
{
    if(k == 1)
        return n;
    if(k == 0)
        return 1;
    LL ret = f(n, k >> 1)%MOD;
    ret = (ret * ret) % MOD;
    if(k & 1){
        ret *= n;
        ret %= MOD;
    } return ret;
}
 
int main(){
    fastio;
    int T;
    cin >> T;
    while (T--) {
        int n, k;
        cin >> n >> k;
        cout<< f(n,k) <<"\n";
    }
}
```

## Exponentiation II [problem](https://cses.fi/problemset/task/1712)
```markdown
題目: 

- 給定多組查詢，每組包含三個整數 a、b、c。
- 要你計算 (a^(b^c)) mod 10^9+7。
- 因為 b^c 可能非常大，不能直接算出再取模，必須分層處理。
```
``` markdown
解法 : 

### 1. 使用模反冪的性質簡化問題：
   - 根據歐拉定理（若 a 與 m 互質，則 a^φ(m) ≡ 1 mod m）：
     - 可將 exponent 降模為 φ(MOD) = 10^9+6。
     - 所以 b^c % (MOD−1) 可作為 a 的最終次方。
     - 最終為：a^(b^c % (MOD−1)) % MOD。

---

### 2. 巢狀快速冪處理：
   - 先用快速冪計算 b^c mod (MOD−1)，再算 a^result mod MOD。
   - 遞迴實作中 `t` 控制當前模數是 MOD（t=0）還是 MOD−1（t=1），防止取錯模。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL solve(LL n, LL k, LL t)
{
    if(k == 1)
        return n;
    if(k == 0)
        return 1;
    LL ret = solve(n, k >> 1, t) % (MOD-t);
    ret = (ret * ret) % (MOD - t);
    if(k & 1){
        ret *= n;
        ret %= (MOD - t);
    } return ret;
}
 
int main(){
    fastio;
    int T;
    cin >> T;
    while (T--) {
        int a, b, c;
        cin >> a >> b >> c;
        cout<< solve(a, solve(b, c, 1), 0) <<"\n";
    }
}
```

## Counting Divisors [problem](https://cses.fi/problemset/task/1713)
```markdown
題目: 

- 給定 T 筆查詢，每筆輸入一個正整數 n。
- 對每個 n，輸出它的**正因數個數**。
- 例如：12 有因數 {1, 2, 3, 4, 6, 12}，總共 6 個。
```
``` markdown
解法 : 

### 1. 利用質因數分解求因數個數：
   - 如果 n 的質因數分解為：n = p1^e1 × p2^e2 × ... × pk^ek，
     - 則它的正整數因數個數為：(e1+1) × (e2+1) × ... × (ek+1)。
   - 程式中做法：
     - 先對 2 和 3 特別處理（效率最佳化）。
     - 接著以 6 為間隔測試質數（i, i+2）來進行 trial division。
     - 若 n 最後大於 1，代表它本身是個大質數，也需要加入。
   - 最後對所有質因數的次方加一並相乘，即為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;

int main(){
    fastio;
    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        map<int, int> m;
        while((n % 2) == 0){
            m[2]++;
            n >>= 1;
        } while((n % 3) == 0){
            m[3]++;
            n /= 3;
        } for(int i = 5; i * i <= n; i += 6){
            while((n % i) == 0){
                m[i]++;
                n /= i;
            } while((n % (i+2)) == 0){  // 別忘了 i+2
                m[i+2]++;
                n /= (i+2);
            }
        }
 
        if (n > 1) m[n]++;
 
        LL ans = 1;
        for(auto e: m){
            ans *= e.s + 1;
        }
        cout << ans << '\n';
    }
}
```

## Common Divisors [problem](https://cses.fi/problemset/task/1081)
```markdown
題目: 

- 給定 n 個整數，從中選出兩個數，問這些數中**最大的共同因數（gcd ≥ 1）**可能是幾？
- 換句話說：求所有數對中，最大可能的 gcd。
```
``` markdown
解法 : 

### 1. 頻率表 + 反向枚舉因數：
   - 用 freq[x] 記錄每個數字出現次數。
   - 從 d = 1e6 開始向下枚舉每個可能的 gcd 值 d。
     - 枚舉所有 d 的倍數 m，統計 freq[m] 出現幾次。
     - 若某個 d 作為因數時，出現的數量 ≥ 2，表示存在至少一對數的 gcd 為 d。
   - 最先找到的 d 就是最大的合法解，因為從大到小枚舉。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
int main(){
    fastio;
    int T = 1;
    while (T--) {
        int n;
        cin >> n;
        vector<int> freq(1e6 + 5, 0);
        for(int i=0; i<n; ++i) {
            int x;
            cin >> x;
            freq[x]++;
        }
 
        for(int d=(1e6); d>=1; --d) {
            int cnt = 0;
            for(int m=d; m<=1e6; m+=d) {
                cnt += freq[m];
                if(cnt >= 2) break;
            }
            if(cnt >= 2) {
                cout << d << endl;
                return 0;
            }
        }
    }
}
```

## Sum of Divisors [problem](https://cses.fi/problemset/task/1082)
```markdown
題目: 

- 給定一個正整數 n，請計算：
  - σ(n) = ∑_{i=1}^{n} (n // i) × i。
- 最後答案對 10^9+7 取模。
- 注意：n 非常大，最多到 10^12，不能直接暴力枚舉每個 i。
```
``` markdown
解法 : 

### 1. 數學推導 + 分塊技巧（Divisor Summation Trick）：
   - 對於所有的 i ∈ [1, n]，n // i 的值其實只會改變 √n 次。
   - 令 q = n // i 固定，則能找到一段連續的區間 [l, r]，使得 n//l = n//r = q。
     - 可以對 q 同值的整段 i 批次計算：∑_{i=l}^{r} i = (l + r)(r − l + 1)/2。
   - 每段的貢獻為：q × ∑_{i=l}^{r} i。

---

### 2. 實作細節：
   - 使用快速乘法與模逆元：
     - (l + r)(r − l + 1)/2 mod MOD 使用 inv2 = 500000004（因為 2 的模逆元）。
   - 記得每一項都對 MOD 取模，避免 overflow。
   - 時間複雜度：O(√n)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
int main(){
    fastio;
    LL n;
    cin >> n;
 
    LL ans = 0;
    for (LL l=1; l<=n; ) {
        LL k = n/l;
        LL r = n/k;
        const LL inv2 = 500000004; // 因為 (2*inv2) ≡ 1 (mod 1e9+7)
 
        LL cnt = (r - l + 1) % MOD;
        LL sum_lr = (l + r) % MOD;
        LL sum_d = cnt * sum_lr % MOD * inv2 % MOD;
        ans = (ans + k % MOD * sum_d % MOD) % MOD;
        l = r+1;
    }
 
    cout << ans << '\n';
}
```

## Divisor Analysis [problem](https://cses.fi/problemset/task/2182)
```markdown
題目: 

- 給定 n 個質因數分解的結果，每個為 (p, a)，代表整數 N = p₁^a₁ × p₂^a₂ × ... × pₙ^aₙ。
- 請輸出以下三個值（mod 10^9+7）：
  1. N 的因數總數。
  2. N 的所有因數之和。
  3. N 的所有因數之積。
```
``` markdown
解法 : 

### 1. 因數總數：
   - 利用公式：N 的因數總數為 (a₁+1) × (a₂+1) × ... × (aₙ+1)。

---

### 2. 因數總和：
   - 每個質因數 pᵢ 貢獻的總和為等比數列：
     - Sᵢ = 1 + pᵢ + pᵢ² + ... + pᵢ^aᵢ = (pᵢ^(aᵢ+1) − 1)/(pᵢ − 1)。
   - 取 mod 需要使用乘法逆元來處理除法：
     - inv(p−1) ≡ pow(p−1, MOD−2)。

---

### 3. 因數積（關鍵）：
   - 因數個數為 D，則因數積為 N^(D/2)。
   - 但要注意 MOD 為質數，指數模運算需用 MOD−1：
     - 使用費馬小定理：a^b mod M，若 b 很大，要對 b 取 mod M−1。
   - 處理奇偶：
     - 若 D 為奇數，將某個 (aᵢ+1)/2，其他正常，確保整體指數為整數。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;

LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main(){
    fastio;
    LL n;
    cin >> n;
    vector<pair<LL, LL>> prime(n);
    for(auto &x: prime){
        cin >> x.f >> x.s;
    }
 
    LL ans = 1LL;
    for(auto x: prime){
        ans *= x.s + 1;
        ans %= MOD;
    } cout << ans;
 
    ans = 1LL;
    for(auto x: prime){
        LL GP = pow(x.f, x.s + 1) % MOD;
        LL inv = pow(x.f - 1, MOD - 2) % MOD;
 
        ans = ans * (((GP-1) * inv) % MOD) % MOD;
    } cout << ' ' << ans;
 
    ans = 1LL;
    LL num1=1;
    LL flag=0;
    for(int i=0;i<n;i++)
    {
        if(prime[i].s%2==1 && flag==0)
        {
            num1*=((prime[i].s+1)/2);
            num1%=MOD - 1;
            flag=1;
        }
        else
        {
            num1*=(prime[i].s+1) % (MOD - 1);
            num1%= (MOD - 1);
        }
    }
    if(flag==0)
    {
        for(int i=0;i<n;i++)
        {
            prime[i].s /= 2;
        }
    }
    LL number=1;
    for(int i=0;i<n;i++)
    {
        number *= pow(prime[i].f, prime[i].s);
        number %= MOD;
    }
    ans = pow(number,num1);
 
    cout << ' ' << ans;
}
```

## Prime Multiples [problem](https://cses.fi/problemset/task/2185)
```markdown
題目: 

- 給定一個整數 n 和 k 個質數 a₁, a₂, ..., aₖ。
- 問從 1 到 n 中，有多少整數是這些質數的倍數？
- 即：有幾個整數 i ∈ [1, n] 滿足 i mod aⱼ = 0 for some j。
```
``` markdown
解法 : 

### 1. 容斥原理 + 枚舉子集：
   - 題目要求的是 union：|A₁ ∪ A₂ ∪ ... ∪ Aₖ|。
   - 使用容斥原理：
     - 每個非空子集 S 對應的貢獻為：
       - (+1)^|S| × floor(n / lcm(S))。
   - 所以對所有子集 mask，計算其 lcm，並將貢獻加總：
     - 若子集大小為奇數 → 加；
     - 若子集大小為偶數 → 減。

---

### 2. 處理 overflow：
   - lcm(a₁, a₂, ..., aⱼ) 容易爆 long long。
   - 因此在乘法前判斷：`prod > n / a[i]` 則提早跳出（避免爆炸）。
   - 此技巧保證運算過程安全。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    ll n;
    int k;
    cin >> n >> k;
 
    vector<ll> a(k);
    for (int i = 0; i < k; ++i) cin >> a[i];
 
    ll ans = 0;
 
    // 枚舉非空子集
    for (int mask = 1; mask < (1 << k); ++mask) {
        ll prod = 1;
        bool overflow = false;
 
        for (int i = 0; i < k; ++i) {
            if ((mask >> i) & 1) {
                if (prod > n / a[i]) {
                    overflow = true;
                    break;
                }
                prod *= a[i];
            }
        }
 
        if (overflow) continue;
 
        int bits = __builtin_popcount(mask);
        if (bits % 2 == 1)
            ans += n / prod;
        else
            ans -= n / prod;
    }
 
    cout << ans << '\n';
}
```

## Counting Coprime Pairs [problem](https://cses.fi/problemset/task/2417)
```markdown
題目: 

- 給定一個長度為 n 的整數陣列，問有多少對數對 (i, j) 滿足：
  - 1 ≤ i < j ≤ n，且 gcd(a[i], a[j]) = 1。
- 也就是要計算總共有哪些互質的數對。
```
``` markdown
解法 : 

### 1. 容斥 + 穆比烏斯函數（Mobius function）：
   - 如果我們能算出 gcd(a[i], a[j]) = d 的數對有幾對，就能透過容斥來求出 gcd = 1 的情況。
   - 令 sum[d] 表示陣列中是 d 的倍數的數量。
   - 則 gcd(x, y) 為 d 的數對總數為 C(sum[d], 2)。

---

### 2. 穆比烏斯反演計算互質對數：
   - 使用 Mobius function μ(d)，可得：
     - 互質對數 = ∑_{d=1}^{max} μ(d) × C(sum[d], 2)
     - 其中 C(sum[d], 2) = sum[d] × (sum[d]−1)/2

---

### 3. 實作步驟：
   - 使用線性篩預處理 μ 值。
   - cnt[x]：記錄每個值 x 出現次數。
   - sum[d]：統計所有是 d 的倍數的數有幾個。
   - 枚舉每個 d，若 μ(d) ≠ 0，累加 μ(d) × C(sum[d], 2)
   - 最後得到所有互質對數量。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
const int MAX = 1e6 + 5;
 
int n, a[MAX], cnt[MAX], mu[MAX];
ll sum[MAX];
 
void getMobius() {
    vector<int> prime;
    vector<bool> isPrime(MAX, true);
    mu[1] = 1;
    for (int i = 2; i < MAX; ++i) {
        if (isPrime[i]) {
            prime.push_back(i);
            mu[i] = -1;
        }
        for (int p : prime) {
            if (i * p >= MAX) break;
            isPrime[i * p] = false;
            if (i % p == 0) {
                mu[i * p] = 0;
                break;
            } else {
                mu[i * p] = mu[i] * mu[p];
            }
        }
    }
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
        cnt[nums[i]]++;
    }
 
    getMobius();
 
    for (int d = 1; d < MAX; ++d)
        for (int m = d; m < MAX; m += d)
            sum[d] += cnt[m];
 
    ll total = 0;
    for (int d = 1; d < MAX; ++d) {
        if (mu[d] == 0) continue;
        ll pairs = sum[d] * (sum[d] - 1) / 2;
        total += mu[d] * pairs;
    }
 
    cout << total << '\n';
}
```

## Next Prime [problem](https://cses.fi/problemset/task/3396)
```markdown
題目: 

- 給定 t 筆查詢，每筆為一個整數 n。
- 對每筆查詢，輸出比 n 大的最小質數。
- 注意 n 的數值可以非常大（最大為 2^63−1），需要一個快速且準確的質數判定方法。
```
``` markdown
解法 : 

### 1. 使用 Miller-Rabin 質數測試（確定版）：
   - 對於 64-bit 整數，可以使用特定 base 的 Miller-Rabin 測試組合，達到**確定性質數判定**。
   - 測試流程：
     - 把 n−1 寫成 d × 2^r。
     - 驗證 base^d ≡ 1 或 base^{d×2^i} ≡ −1（mod n）是否成立。
     - 若都不成立，n 為合數。

---

### 2. 快速冪（模乘時使用 __int128）：
   - 因為質數 n 可能接近 2^63−1，乘法需避免 overflow。
   - 使用 `(__int128)` 來保證乘法過程中不會超界。

---

### 3. 搜尋邏輯：
   - 從 n+1 開始暴力遞增，直到找到第一個 isPrime(n) 為 true 的數，即為答案。
   - 由於 Miller-Rabin 判定極快，整體效能可接受。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
 
// 快速冪 (a^b mod m)
ll qpow(ll a, ll b, ll m) {
    ll res = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (ll)((__int128)res * a % m);
        a = (ll)((__int128)a * a % m);
        b >>= 1;
    }
    return res;
}
 
// Miller-Rabin 單次測試
bool check(ll n, ll base) {
    if (n % base == 0) return false;
    ll d = n - 1;
    int r = 0;
    while ((d & 1) == 0) d >>= 1, r++;
 
    ll x = qpow(base, d, n);
    if (x == 1 || x == n - 1) return true;
 
    for (int i = 1; i < r; ++i) {
        x = (ll)((__int128)x * x % n);
        if (x == n - 1) return true;
    }
    return false;
}
 
// 確定版質數測試（64-bit 安全）
bool isPrime(ll n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0) return false;
 
    static const ll bases[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37};
    for (ll base : bases) {
        if (base >= n) break;
        if (!check(n, base)) return false;
    }
    return true;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int t;
    cin >> t;
    while (t--) {
        ll n;
        cin >> n;
        ++n;
        while (!isPrime(n)) ++n;
        cout << n << '\n';
    }
}
```

## Binomial Coefficients [problem](https://cses.fi/problemset/task/1079)
```markdown
題目: 

- 給定多組查詢，每次給你整數 a 和 b，要求你計算：
  - C(a, b) = a! / (b! × (a − b)!) mod 10^9+7
```
``` markdown
解法 : 

### 1. 組合數公式：
   - C(a, b) = a! / (b!(a−b)!)。
   - 由於 MOD 是質數，可以使用**費馬小定理**處理除法：
     - x / y ≡ x × y^(MOD−2) (mod MOD)

---

### 2. 實作細節：
   - 預先計算 0 到 10^6 的階乘表 `table[i] = i! mod MOD`
   - 每次查詢時：
     - 先取 table[a]。
     - 再乘上 table[b] 的乘法逆元。
     - 再乘上 table[a−b] 的乘法逆元。
   - 時間複雜度：
     - 前處理：O(N)
     - 每次查詢：O(log MOD)（快速冪取 inverse）

---

### 3. 注意事項：
   - 當 b = 0 或 b = a 時，C(a, b) = 1，自然地這套公式仍然適用。
   - 使用快速冪 pow(base, MOD−2) 處理模逆元，確保效能與正確性。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main(){
    fastio;
    int t;
    cin >> t;
    vector<LL> table(1e6 + 10, 1LL);
    for(LL i = 1LL; i <= 1e6; ++i){
        table[i] = (table[i - 1LL] * i) % MOD;
    }
 
    while(t--){
        LL a, b;
        cin >> a >> b;
        LL inv1 = pow(table[b], MOD - 2LL);
        LL inv2 = pow(table[a - b], MOD - 2LL);
        cout << ((table[a] * inv1 % MOD)* inv2 % MOD) << '\n';
    }
}
```

## Creating Strings II [problem](https://cses.fi/problemset/task/1079)
```markdown
題目: 

- 給定一個小寫字母組成的字串 s。
- 請你計算有多少種不同的排列方式（字典順序不限）。
- 最後答案對 10^9+7 取模。
```
``` markdown
解法 : 

### 1. 排列組合公式：
   - 假設字串長度為 n，且每個字母出現次數為 freq₁, freq₂, ..., freqₖ。
   - 那麼總排列數為：
     - n! / (freq₁! × freq₂! × ... × freqₖ!)
   - 因為涉及除法，需要使用**模逆元**處理：
     - x / y ≡ x × y^(MOD−2) (mod MOD)

---

### 2. 實作細節：
   - 預先計算階乘表 table[i] = i! mod MOD。
   - 統計每個字母出現次數 vocab[i]。
   - 計算：
     - 分子為 table[n]
     - 每個 freq[i]! 取模後再取 inverse，相乘進去。
   - 時間複雜度：
     - O(N + 26logMOD)，適用於長度最多 1e6 的情況。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main(){
    fastio;
    vector<LL> table(1e6 + 10, 1LL);
    for(LL i = 1LL; i <= 1e6; ++i){
        table[i] = (table[i - 1LL] * i) % MOD;
    }
    
    string input;
    cin >> input;
    vector<LL> vocab(26, 0LL);
    for(int i = 0; input[i]; ++i){
        vocab[input[i] - 'a']++;
    }
 
    LL ans = table[input.length()];
    for(int i = 0; i < 26; ++i){
        if(vocab[i] == 0)
            continue;
        LL inv = pow(table[vocab[i]], MOD - 2);
        ans = (ans * inv) % MOD;
    } 
    cout << ans << '\n';
}
```

## Distributing Apples [problem](https://cses.fi/problemset/task/1716)
```markdown
題目: 

- 有 m 顆蘋果要分給 n 個小孩，每個小孩可以拿 0 顆以上。
- 問有幾種不同的分法（不同分配順序視為不同分法）。
- 最後答案對 10^9+7 取模。
```
``` markdown
解法 : 

### 1. 轉換為組合數問題：
   - 問題等價於：
     - 把 m 顆蘋果放入 n 個桶子中，每桶可為 0。
     - 這是經典「**整數劃分 + 重複組合**」問題。
   - 對應公式為：
     - C(n + m − 1, m)
     - 選 m 個蘋果要插入 n−1 個隔板（可重複）

---

### 2. 組合數計算：
   - 使用組合公式：
     - C(a, b) = a! / (b! × (a − b)!)
   - 預先算出階乘表 table[i]。
   - 使用快速冪處理除法模逆：
     - y^(-1) ≡ y^(MOD−2) mod MOD
   - 最終答案為：
     - table[n+m−1] × inv(table[m]) × inv(table[n−1])
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
bool cmp(pLL a, pLL b){
    return (a.f == b.f) ? a.s > b.s : a.f < b.f;
}
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main(){
    fastio;
    vector<LL> table(2e6 + 10, 1LL);
    for(LL i = 1LL; i <= 2e6; ++i){
        table[i] = (table[i - 1LL] * i) % MOD;
    }
    LL n, m;
    cin >> n >> m;
 
    LL ans = table[n + m - 1];
    cout << ((ans * pow(table[m], MOD - 2) % MOD) * pow(table[n - 1], MOD - 2) % MOD)<< '\n';
}
```

## Christmas Party [problem](https://cses.fi/problemset/task/1717)
```markdown
題目: 

- 有 n 個人參加聖誕派對，每個人可以選擇：
  - 要和某個人互相交換禮物（兩人一組），或
  - 不參與交換。
- 每人最多參加一組，問總共有幾種不同的分組方式（mod 10^9+7）。
```
``` markdown
解法 : 

### 1. 將問題轉換為「錯排（Derangement）」類型：
   - 這是一個經典的「**容斥 + 配對**」動態規劃問題。
   - 定義 D[i] 為 i 個人能產生的有效配對方案數。
   - 遞推關係：
     - D[1] = 0（1 個人無法成對）
     - D[2] = 1（只有 1 種互換）
     - D[n] = (n−1) × (D[n−1] + D[n−2])
       - 選一人 A，有兩種情況：
         1. A 和某人配對：剩下 n−2 人問題轉為 D[n−2]
         2. A 不配對：剩下 n−1 人問題轉為 D[n−1]

---

### 2. 實作細節：
   - 使用動態規劃陣列 D[] 記錄答案。
   - 每次都對 MOD 取模避免 overflow。
   - 時間與空間複雜度：O(n)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main(){
    fastio;
    int n;
    cin >> n;
    vector<long long> D(n + 1);
    D[1] = 0;
    D[2] = 1;
    for(int i=3;i<=n;i++) {
        D[i] = (i-1) * (D[i-1] + D[i-2]) % MOD;
    }
    cout << D[n] << '\n';
}
```

## Permutation Order [problem](https://cses.fi/problemset/task/3397)
```markdown
題目: 

- 有兩種查詢操作，共 t 筆：
  1. 給你 n 和 k，請你輸出在所有 n! 個排列中字典序第 k 小的排列。
  2. 給你一個 n 的排列，請你輸出它在所有排列中的字典序排名（從 1 開始）。
```
``` markdown
解法 : 

### 1. 查詢類型 1：第 k 小的排列
   - 這是**康托展開反推（Cantor Unranking）**的問題。
   - 對於長度 n 的排列：
     - 每一段有 (n−1)! 種開頭選法。
     - 找到 k 屬於哪個區段後，遞迴解剩下的部分。
   - 時間複雜度：O(n^2)，使用 table[] 來紀錄剩餘可選數字。

---

### 2. 查詢類型 2：給定排列求排名
   - 這是**康托展開（Cantor Ranking）**的問題。
   - 對於每個位置，計算目前未用數中有多少比當前值小的。
     - 計算這些小值能形成多少個排列數，加總即為排名。
   - 最後記得要加 1，因為題目要求從 1 開始算排名。

---

### 3. 技術細節與實作
   - 需用一個 table[] 或 bit[] 來記錄哪些數字已經被選過。
   - 預處理 factorial：最大值約到 20! 以內。
   - 注意康托展開與反展開都需避免重複計數與 index 錯誤。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
LL findKth(LL n, vector<LL> perm){
    LL ret = 0, factorial = 1;
    for(int i = 1; i<n; ++i){
        factorial *= i;
    }
 
    vector<LL> table(n + 1, 1);
    for(int i = 0; i < n - 1; ++i){
        int cnt = 0;
        for(int j = 1; j <= perm[i]; ++j){
            cnt += table[j];
        } table[perm[i]] = 0;
        ret += (cnt - 1) * factorial;
        factorial /= (n - i - 1);
    } return ret;
}
 
vector<LL> getKth(LL n, LL k){
    if(n == 1){
        return vector<LL>(1, k);
    }
    LL section = 1;
    for(LL i = 1; i < n; ++i){
        section *= i;
    }
    vector<LL> ret;
    for(LL i = 1; i <= n; ++i){
        if(k <= section * (i)){
            ret = getKth(n - 1, k - (section * (i-1)));
            ret.push_back(i);
            break;
        }
    } return ret;
}
 
int main(){
    fastio;
    int t;
    cin >> t;
    while(t--){
        int cmd;
        cin >> cmd;
        if(cmd == 1) {
            LL n, k;
            cin >> n >> k;
            vector<LL> perm = getKth(n, k);
            reverse(perm.begin(), perm.end());
            vector<LL> table(n + 1, 1);
            for(auto &e: perm){
                for(int i = 1, cnt = 0; i <= n; ++i){
                    if(cnt + table[i] == e){
                        e = i;
                        table[i] = 0;
                        break;
                    } cnt+= table[i];
                }
            }
 
            for(auto e: perm){
                cout << e << ' ';
            } cout << '\n';
        } else {
            int n;
            cin >> n;
            vector<LL> perm(n);
            for(auto &e: perm)
                cin >> e;
            cout << findKth(n, perm) + 1 << '\n';
        }
    }
}
```

## Permutation Rounds [problem](https://cses.fi/problemset/task/3398)
```markdown
題目: 

- 給定一個長度為 N 的排列 perm[1..N]，定義一場遊戲如下：
  - 每次從一個尚未被拜訪的點開始，沿著 perm 的映射跳，直到回到起點，形成一個 cycle。
- 問你：**所有 cycle 長度的最小公倍數（LCM）是多少？**
- 輸出對 10^9+7 取模的結果。
```
``` markdown
解法 : 

### 1. 尋找 cycle 長度：
   - 每個元素剛好出現在一個 cycle 中。
   - 使用 DFS 或 while-loop 掃描 permutation，記錄每個 cycle 的長度 len。
   - 對所有 len 做 LCM。

---

### 2. 如何高效地取模 LCM？
   - 直接算 LCM 會爆 long long，因此將每個長度分解質因數：
     - LCM(a, b, ...) = 乘上所有質因數的最大次方。
   - 對每個長度做質因數分解，並用 `map<int, int>` 存每個質因數的最高次方。

---

### 3. 實作細節：
   - 使用埃氏篩先求出質數表（primes[]）。
   - 對每個 cycle 的長度進行分解質因數，更新每個質數的最大指數。
   - 最後重建答案：
     - ans = ∏ (p^e) for each (p, e) in map。
     - 用快速乘法處理模 10^9+7。
```

``` cpp
#include <bits/stdc++.h>
 
using namespace std;
typedef long long ll;
const int maxN = 2e5+1;
const ll MOD = (ll) 1e9+7;
 
int N, perm[maxN];
bool vis[maxN], is_prime[maxN];
vector<int> primes;
map<int,int> ans;
 
void init_primes(){
    for(int i = 2; i < maxN; i++)   is_prime[i] = true;
    for(int i = 2; i < maxN; i++){
        if(is_prime[i]){
            primes.push_back(i);
            for(int j = 2 * i; j < maxN; j += i)
                is_prime[j] = false;
        }
    }
}
 
int dfs(int u){
    vis[u] = true;
    if(vis[perm[u]])    return 1;
    return dfs(perm[u]) + 1;
}
 
void prime_factor(int x){
    for(int i = 0; i < (int) primes.size() && primes[i] <= x; i++){
        int p = primes[i];
        int num_divisions = 0;
        while(x % p == 0){
            x /= p;
            num_divisions++;
        }
 
        if(num_divisions > 0)
            ans[p] = max(ans[p], num_divisions);
    }
}
 
int main(){
    init_primes();
 
    scanf("%d", &N);
    for(int i = 1; i <= N; i++)
        scanf("%d", &perm[i]);
 
    for(int u = 1; u <= N; u++){
        if(!vis[u]){
            int len = dfs(u);
            prime_factor(len);
        }
    }
 
    ll prod = 1;
    for(auto const& [prime, power] : ans)
        for(int i = 0; i < power; i++)
            prod = (prod * prime) % MOD;
    printf("%lld\n", prod);
}
```

## Bracket Sequences I [problem](https://cses.fi/problemset/task/2064)
```markdown
題目: 

- 給定一個整數 n，問有多少個長度為 n 的合法括號序列。
- 括號序列只能包含 `()`，且必須合法（左括號數量等於右括號，且任意前綴中左括號不少於右括號）。
- 輸出對 10^9+7 取模的結果。
```
``` markdown
解法 : 

### 1. 卡特蘭數公式（Catalan Number）：
   - 合法括號序列數量對應第 k 個卡特蘭數（k = n/2）：
     - Cₖ = C(2k, k) / (k + 1)
     - 即：Cₖ = (2k)! / (k!(k+1)!)
   - 若 n 為奇數，直接輸出 0。

---

### 2. 快速計算組合數：
   - 預先計算 fact[i] = i! mod MOD，以及其反元素 invfact[i]。
   - 使用快速冪計算模反元素：
     - a^(-1) ≡ a^(MOD - 2) mod MOD（MOD 為質數時）

---

### 3. 實作技巧：
   - `fact[]` 與 `invfact[]` 須開到 2e6+5，避免 overflow。
   - 注意不要在模數下做除法，應使用乘上逆元。
   - 最終答案為：
     - catalan = C(2k, k) × inv(k + 1) mod MOD
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
 
const int MAX = 2e6 + 5;  // 要開到 2 * 1e6
const ll MOD = 1e9 + 7;
 
ll fact[MAX], invfact[MAX];
 
// 快速冪
ll power(ll a, ll b) {
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}
 
// 組合數
ll C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invfact[k] % MOD * invfact[n - k] % MOD;
}
 
// 初始化階乘與反元素
void init() {
    fact[0] = invfact[0] = 1;
    for (int i = 1; i < MAX; i++)
        fact[i] = fact[i - 1] * i % MOD;
    invfact[MAX - 1] = power(fact[MAX - 1], MOD - 2);
    for (int i = MAX - 2; i >= 1; i--)
        invfact[i] = invfact[i + 1] * (i + 1) % MOD;
}
 
int main() {
    int n;
    cin >> n;
 
    if (n % 2 == 1) {
        cout << 0 << '\n';
        return 0;
    }
 
    init();
    int k = n / 2;
    ll catalan = C(2 * k, k) * power(k + 1, MOD - 2) % MOD;
    cout << catalan << '\n';
}
```

## Bracket Sequences II [problem](https://cses.fi/problemset/task/2187)
```markdown
題目: 

- 給定一個整數 n（括號總長度）和一段長度為 k 的合法括號前綴字串 prefix。
- 請問：在補上剩下的 n − k 個括號後，有多少種方法可以形成一個**完整合法**的括號序列？
- 所有結果對 10^9+7 取模。
```
``` markdown
解法 : 

### 1. 前綴合法性檢查：
   - 若 prefix 本身不合法（右括號比左括號多），直接輸出 0。
   - 合法前綴定義：任意前綴中左括號數 ≥ 右括號數。

---

### 2. 剩餘括號補法計算：
   - 計算剩餘括號數 rem = n − k。
   - 假設目前 balance = open − close（還欠 balance 個 `)` 才平衡）。
   - 想要形成合法序列，需保證：
     - 剩下的括號能補足這個 balance，並形成完整對。
     - 所以：(rem + balance) 必須為偶數，且 rem ≥ balance。

---

### 3. 將問題轉為 Catalan-like：
   - 設 a 為要補的左括號個數，b 為要補的右括號個數：
     - a = (rem + balance) / 2
     - b = rem − a
   - 最後用標準公式計算合法括號數：
     - 答案 = C(a + b, a) − C(a + b, a + 1)
       - C(a + b, a): 所有的左右配對可能
       - C(a + b, a + 1): 不合法的括號（會出現過多右括號）
   - 這是經典的「Catalan 數列在有限前綴條件下的應用」

---

### 4. 計算組合數技巧：
   - 使用預處理 factorial 和 inverse factorial 表
   - 所有除法都改為乘上逆元（MOD 為質數）
   - C(n, k) = fact[n] × invfact[k] × invfact[n − k] mod MOD
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
 
const int MOD = 1e9 + 7;
const int MAX = 2e6 + 5; // 要夠大支援最大 n = 1e6
 
ll fact[MAX], invfact[MAX];
 
ll power(ll a, ll b) {
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}
 
void init() {
    fact[0] = invfact[0] = 1;
    for (int i = 1; i < MAX; i++)
        fact[i] = fact[i - 1] * i % MOD;
    invfact[MAX - 1] = power(fact[MAX - 1], MOD - 2);
    for (int i = MAX - 2; i >= 1; i--)
        invfact[i] = invfact[i + 1] * (i + 1) % MOD;
}
 
ll C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invfact[k] % MOD * invfact[n - k] % MOD;
}
 
int main() {
    init();
 
    int n;
    string prefix;
    cin >> n >> prefix;
 
    int k = prefix.length();
    int open = 0, close = 0;
 
    for (char c : prefix) {
        if (c == '(') open++;
        else close++;
        if (close > open) {
            cout << 0 << '\n';
            return 0; // 不合法：右括號比左括號還多
        }
    }
 
    int rem = n - k;
    int balance = open - close;
 
    // 如果剩下不是偶數個，無法湊成合法對
    if ((rem + balance) % 2 != 0 || rem < balance) {
        cout << 0 << '\n';
        return 0;
    }
 
    int a = (rem + balance) / 2; // 要補的左括號
    int b = rem - a;             // 要補的右括號
 
    // 使用 Catalan-like 公式：C(a + b, a) - C(a + b, a + 1)
    ll ans = (C(a + b, a) - C(a + b, a + 1) + MOD) % MOD;
    cout << ans << '\n';
}
```

## Counting Necklaces [problem](https://cses.fi/problemset/task/2209)
```markdown
題目: 

- 給定整數 n（珠子的數量）和 m（每顆珠子可選的顏色數），
- 問有多少種不同的「項鍊塗色方式」？
  - 項鍊是環狀結構，若透過旋轉可以互相對應，則視為相同方案。
- 結果對 10^9+7 取模。
```
``` markdown
解法 : 

### 1. Burnside 引理（Burnside’s Lemma）：
   - 我們要算的是：在 n 個位置中，有多少種 m 顏色的上色方法，對所有旋轉情況下不重複計數。
   - 根據 Burnside 引理：
     - ans = (1/n) × ∑_{r=0}^{n−1} m^gcd(n, r)
       - r 表示旋轉 r 位
       - gcd(n, r) 表示固定點數（不變的位置）
       - m^gcd(n, r)：固定後每個 cycle 可以隨意染色

---

### 2. 快速冪與模逆元：
   - 因為每次都需要計算 m^gcd(n, r)，使用快速冪加速。
   - 最後的除法 `(sum / n) mod MOD`，改為乘上 n 的乘法逆元：
     - 使用 `mod_pow(n, MOD − 2)` 來計算。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MOD = 1e9 + 7;
 
// 快速冪 m^k % MOD
ll mod_pow(ll m, ll k) {
    ll res = 1;
    while (k) {
        if (k & 1) res = res * m % MOD;
        m = m * m % MOD;
        k >>= 1;
    }
    return res;
}
 
// m^gcd(n, r) 對所有 r=0 到 n-1 做和，再除以 n
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    ll n, m;
    cin >> n >> m;
 
    ll sum = 0;
    for (ll r = 0; r < n; ++r) {
        ll g = __gcd(n, r);
        sum = (sum + mod_pow(m, g)) % MOD;
    }
 
    // 除以 n，相當於乘上 n 的乘法反元素
    ll inv_n = mod_pow(n, MOD - 2);
    ll ans = sum * inv_n % MOD;
    cout << ans << '\n';
}
```

## Counting Grids [problem](https://cses.fi/problemset/task/2210)
```markdown
題目: 

- 給定一個 n×n 的網格，每格可填入 0 或 1（共 2 種顏色），
- 兩個填色方案若經過旋轉（0°, 90°, 180°, 270°）後一致，則視為**同一種**填法。
- 問有多少種不同的填色方式，mod 10^9+7。
```
``` markdown
解法 : 

### 1. Burnside 引理（Burnside’s Lemma）：
   - 要計算在所有對稱操作下的不重複配置數量，可使用 Burnside 引理：
     - ans = (1/|G|) × ∑_{g∈G} Fix(g)
     - G：所有操作（本題為旋轉 0°, 90°, 180°, 270°）
     - Fix(g)：在操作 g 下不變的塗色方案數

---

### 2. 旋轉類型的固定點數：
   - **0° (恆等變換)**：全部固定，2^(n²)
   - **180°**：每對對稱格子需一致 ⇒ 2^((n² + 1)/2)
   - **90° & 270°**：每 4 個格子形成 cycle ⇒ 2^((n² + 3)/4)
   - 最後總和為：  
     - total = (term0 + 2×term90_270 + term180) / 4

---

### 3. 實作技巧：
   - 使用快速冪計算模下的大次方。
   - 除以 4 使用乘法逆元：`modpow(4, MOD−2)`。
   - 注意使用 `(n² + 1)/2` 和 `(n² + 3)/4` 是為了確保整數除法正確。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
 
const ll MOD = 1e9 + 7;
 
// 快速冪
ll modpow(ll base, ll exp) {
    ll res = 1;
    while (exp) {
        if (exp & 1) res = res * base % MOD;
        base = base * base % MOD;
        exp >>= 1;
    }
    return res;
}
 
int main() {
    ll n;
    cin >> n;
    ll n2 = n * n;
 
    ll term0 = modpow(2, n2);
    ll term180 = modpow(2, (n2 + 1) / 2);
    ll term90_270 = modpow(2, (n2 + 3) / 4);
 
    ll total = (term0 + 2 * term90_270 + term180) % MOD;
    total = total * modpow(4, MOD - 2) % MOD; // 除以 4
 
    cout << total << "\n";
    return 0;
}
```

## Fibonacci Numbers [problem](https://cses.fi/problemset/task/1722)
```markdown
題目: 

- 給定一個整數 k，請你輸出 Fibonacci(k) 的值（mod 10^9+7）。
- Fibonacci 定義如下：
  - F(0) = 0, F(1) = 1
  - F(k) = F(k−1) + F(k−2) for k ≥ 2
- 限制：0 ≤ k ≤ 10^18，需要高效計算。
```
``` markdown
解法 : 

### 1. 快速矩陣冪（Matrix Exponentiation）：
   - 對於 Fibonacci 數列，可以用轉移矩陣表示為：
     - [F(k)  ]   = [1 1]^k × [F(1)]
     - [F(k−1)]     [1 0]     [F(0)]
   - 因此，我們只需要將矩陣 A = [[1,1],[1,0]] 快速冪到 k−1 次方，即可得到 F(k)。

---

### 2. 優化細節：
   - 使用 2×2 矩陣乘法實作。
   - 快速冪時間複雜度為 O(log k)，可應對高達 10^18 的 k。
   - 注意要模 MOD = 10^9+7，避免 overflow。

---

### 3. 特殊情況：
   - 若 k = 0，直接輸出 0。
   - 若 k = 1 或 2，F(k) = 1，可直接輸出。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 1e9+7;
 
struct Mat {
    ll m[2][2] = {{0,0},{0,0}};
 
    Mat operator*(const Mat &b) const {
        Mat r;
        for(int i=0;i<2;i++)
            for(int j=0;j<2;j++)
                for(int k=0;k<2;k++)
                    r.m[i][j] = (r.m[i][j] + m[i][k]*b.m[k][j]%MOD)%MOD;
        return r;
    }
};
 
Mat qpow(Mat a, ll k) {
    Mat r; // 單位矩陣
    r.m[0][0]=r.m[1][1]=1;
    while(k) {
        if(k&1) r = r * a;
        a = a * a;
        k >>= 1;
    }
    return r;
}
 
int main() {
    ll k;
    cin >> k;
    if(k == 0){
        cout << 0 << endl;
        return 0;    
    }
    if(k==1 || k==2) {
        cout << 1 << endl;
        return 0;
    }
    Mat A;
    A.m[0][0]=A.m[0][1]=A.m[1][0]=1;
    Mat res = qpow(A, k-2);
    ll ans = (res.m[0][0] + res.m[0][1]) % MOD;
    cout << ans << endl;
}
```

## Throwing Dice [problem](https://cses.fi/problemset/task/1096)
```markdown
題目: 

- 有一顆六面骰子（面值為 1~6），你每次丟出來的點數會累加。
- 問你總共有幾種方式讓點數總和正好為 n。
- 結果對 10^9+7 取模。
```
``` markdown
解法 : 

### 1. 定義與遞推關係：
   - 定義 dp[n] 為總和為 n 的合法組合數。
   - 轉移式：
     - dp[n] = dp[n−1] + dp[n−2] + ... + dp[n−6]
   - 初始條件：
     - dp[0] = 1（什麼都不丟就是一種方式）
     - dp[1] = 1, dp[2] = 2, dp[3] = 4, ..., dp[6] = 32（可直接列舉）

---

### 2. 矩陣快速冪優化：
   - 因為轉移式是線性遞推，最多依賴前六項，因此可以使用**矩陣快速冪**優化成 O(log n)。
   - 狀態設為長度為 6 的向量 dp[n], dp[n−1], ..., dp[n−5]。
   - 使用 6×6 的轉移矩陣 T，使得：
     - T^k × base = dp[n]，其中 base 是 dp[6], dp[5], ..., dp[1]

---

### 3. 實作細節：
   - 若 n ≤ 6，直接輸出對應初始值。
   - 否則：
     - 對轉移矩陣 T 做 T^(n−6)
     - 再與 base 向量做乘法，取第 0 項即為 dp[n]
   - 所有乘法與加法都取模，確保不爆 long long。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int MOD = 1e9 + 7;
const int K = 6;
 
using Matrix = vector<vector<ll>>;
 
Matrix mul(Matrix& a, Matrix& b) {
    Matrix res(K, vector<ll>(K));
    for (int i = 0; i < K; ++i)
        for (int j = 0; j < K; ++j)
            for (int k = 0; k < K; ++k)
                res[i][j] = (res[i][j] + a[i][k] * b[k][j]) % MOD;
    return res;
}
 
Matrix power(Matrix base, ll exp) {
    Matrix res(K, vector<ll>(K));
    for (int i = 0; i < K; ++i)
        res[i][i] = 1;
    while (exp) {
        if (exp & 1)
            res = mul(res, base);
        base = mul(base, base);
        exp >>= 1;
    }
    return res;
}
 
int main() {
    ll n;
    cin >> n;
 
    if (n <= 6) {
        // 手動 dp 初始化
        vector<ll> base = {1, 2, 4, 8, 16, 32};
        cout << base[n - 1] << '\n';
        return 0;
    }
 
    // base dp[1~6]
    vector<ll> base = {1, 2, 4, 8, 16, 32};
 
    // 建立轉移矩陣 T
    Matrix T(K, vector<ll>(K));
    T[0] = {1,1,1,1,1,1};
    for (int i = 1; i < K; ++i)
        T[i][i-1] = 1;
 
    Matrix Tn = power(T, n - 6);
 
    ll result = 0;
    for (int i = 0; i < K; ++i)
        result = (result + Tn[0][i] * base[5 - i]) % MOD;
 
    cout << result << '\n';
}
```

## Graph Paths I [problem](https://cses.fi/problemset/task/1723)
```markdown
題目: 

- 給定一張 n 個點、m 條有向邊的圖，以及一個整數 k。
- 問從點 1 出發，到點 n，走恰好 k 步（邊）的不同路徑總數。
```
``` markdown
解法 : 

### 1. 觀察：
   - 要從 1 到 n 的路徑，且長度正好是 k。
   - 這可以轉化成一個典型的**矩陣乘法遞推問題**。
   - 若 A 為鄰接矩陣，則 A^k[i][j] 表示從 i 到 j 恰好走 k 步的路徑數。

---

### 2. 矩陣快速冪：
   - 使用 n×n 矩陣 A 表示圖的鄰接關係。
     - A[i][j] 為從 i 到 j 有幾條邊（可重邊）。
   - 要計算 A^k 的結果，使用**快速矩陣冪**：
     - 時間複雜度：O(n^3 × log k)
   - 最後輸出 A^k[1][n] 即為答案。

---

### 3. 技術細節：
   - 自定義結構 Mat 支援乘法運算與初始化。
   - 初始化 r 為單位矩陣，用於快速冪起始值。
   - 注意所有運算都要取模 MOD = 10^9+7。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MOD = 1e9+7;
const int N = 110;
 
int n;
struct Mat {
    ll m[N][N];
    Mat() { memset(m, 0, sizeof m); }
    Mat operator*(const Mat &b) const {
        Mat r;
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                for(int k=1;k<=n;k++)
                    r.m[i][j] = (r.m[i][j] + m[i][k]*b.m[k][j]%MOD)%MOD;
        return r;
    }
};
 
Mat qpow(Mat a, ll k) {
    Mat r;
    for(int i=1;i<=n;i++) r.m[i][i]=1;
    while(k) {
        if(k&1) r = r*a;
        a = a*a;
        k >>=1;
    }
    return r;
}
 
int main() {
    int m;
    ll k;
    cin >> n >> m >> k;
    Mat A;
    while(m--) {
        int u,v;
        cin >> u >> v;
        A.m[u][v]++;
    }
    A = qpow(A, k);
    cout << A.m[1][n] << endl;
}
```

## Graph Paths II [problem](https://cses.fi/problemset/task/1724)
```markdown
題目: 

- 給定一張有向圖（n 個點，m 條邊），每條邊有非負權重。
- 問：從節點 1 出發到節點 n，恰好經過 k 條邊的**最短路徑長度**是多少？
- 若無法在恰好 k 步內抵達，輸出 -1。
```
``` markdown
解法 : 

### 1. 觀察與建模：
   - 我們要找的是：從點 1 到點 n，經過**恰好 k 條邊**的最短路徑。
   - 傳統 Dijkstra / Bellman-Ford 不適用於「剛好 k 步」的限制。
   - 解法是：**最短路徑矩陣 + min-plus 矩陣乘法 + 快速冪**。

---

### 2. 定義與操作：
   - 定義鄰接矩陣 A，其中 A[i][j] 為從 i 到 j 的邊權（若存在，否則為 ∞）。
   - 那麼：
     - A^1[i][j] 表示：從 i 到 j 經過 1 條邊的最短路。
     - A^2[i][j] 表示：從 i 到 j 經過 2 條邊的最短路。
     - ...
     - A^k[i][j] 表示：從 i 到 j 經過 k 條邊的最短路。
   - 所以，我們只需計算 A^k，然後輸出 A^k[1][n]。

---

### 3. 快速矩陣冪（min,+ 乘法）：
   - 與一般矩陣乘法不同，我們這邊使用：
     - r[i][j] = min over all k of (a[i][k] + b[k][j])
     - 稱為 **min-plus 矩陣乘法**。
   - 搭配快速冪計算 A^k，在 O(n³ log k) 時間內完成。

---

### 4. 特別注意：
   - 初始矩陣除了有邊的地方，其餘皆設為 INF（不能為 0！）
   - 計算過程需避免溢位：使用 64-bit 整數。
   - 最後答案若為 INF，表示無解，輸出 −1。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MOD = 1e9+7;
const int N = 110;
const long long INF = 1LL << 60;
 
int n;
 
struct Mat {
    ll m[N][N];
    Mat() { 
        for(int i=0;i<N;i++) for(int j=0;j<N;j++) 
            m[i][j] = INF; 
    }
    Mat operator*(const Mat &b) const {
        Mat r;
        for(int i=1;i<=n;i++) 
            for(int j=1;j<=n;j++) 
                for(int k=1;k<=n;k++) 
                    r.m[i][j] = min(r.m[i][j], m[i][k] + b.m[k][j]);
        return r;
    }
};
 
Mat qpow(Mat a, ll k) {
    Mat r = a; k--;
    while(k) {
        if(k&1) r = r*a;
        a = a*a;
        k >>=1;
    }
    return r;
}
 
int main() {
    int m;
    ll k;
    cin >> n >> m >> k;
    Mat A;
    while(m--) {
        ll u, v, c;
        cin >> u >> v >> c;
        A.m[u][v] = min(A.m[u][v], c);
    }
    A = qpow(A, k);
    cout << (A.m[1][n] == INF ? -1 : A.m[1][n]) << endl;
}
```

## System of Linear Equations [problem](https://cses.fi/problemset/task/3154)
```markdown
題目: 

- 給定一個 n × m 的線性方程組 Ax = b（模質數 MOD）。
- 每個係數與常數項都在 0 到 MOD-1 之間，MOD 是質數（這裡為 1e9+7）。
- 需要求出一組解，如果無解則輸出 -1。
- 如果有多組解，則輸出其中任意一組（自由變數可取 0）。
```
``` markdown
解法 : 

### 1. Gaussian Elimination 模數化：
   - 將矩陣擴充成 n × (m+1)（最後一欄為常數項 b）。
   - 從左到右依序選擇主元列，透過 `modinv` 計算模反元素，使主元歸一化。
   - 使用模數下的加減乘消去其他列的該列元素。

---

### 2. 檢查無解條件：
   - 如果某一列前 m 個係數全為 0，但最後一欄不為 0，則表示 0 = 非零，無解。

---

### 3. 解的構造：
   - `where[col]` 記錄每個變數是否有主元所在的行。
   - 對於有主元的變數，解為該行最後一欄值；自由變數取 0 即可。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
using ll = long long;
const int MOD = 1'000'000'007;
 
int modinv(int a, int m = MOD) {
    int b = m, x = 1, y = 0;
    while (b) {
        int q = a / b;
        tie(a, b) = make_pair(b, a % b);
        tie(x, y) = make_pair(y, x - q * y);
    }
    return (x % m + m) % m;
}
 
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
}
 
int main() {
    fastio();
    int n, m;
    cin >> n >> m;
    vector<vector<int>> A(n, vector<int>(m + 1)); // augmented matrix: A | b
 
    for (int i = 0; i < n; ++i)
        for (int j = 0; j <= m; ++j)
            cin >> A[i][j];
 
    vector<int> where(m, -1);
    for (int col = 0, row = 0; col < m && row < n; ++col) {
        int sel = row;
        for (int i = row; i < n; ++i)
            if (A[i][col] != 0)
                sel = i;
        if (A[sel][col] == 0) continue;
 
        swap(A[sel], A[row]);
        where[col] = row;
 
        int inv = modinv(A[row][col]);
        for (int j = 0; j <= m; ++j)
            A[row][j] = (1LL * A[row][j] * inv) % MOD;
 
        for (int i = 0; i < n; ++i) {
            if (i != row && A[i][col]) {
                int coef = A[i][col];
                for (int j = 0; j <= m; ++j) {
                    A[i][j] = (A[i][j] - 1LL * coef * A[row][j] % MOD + MOD) % MOD;
                }
            }
        }
        ++row;
    }
 
    // Check for inconsistency
    for (int i = 0; i < n; ++i) {
        bool all_zero = true;
        for (int j = 0; j < m; ++j)
            if (A[i][j]) all_zero = false;
        if (all_zero && A[i][m]) {
            cout << -1 << '\n'; // No solution
            return 0;
        }
    }
 
    vector<int> ans(m);
    for (int j = 0; j < m; ++j) {
        if (where[j] != -1)
            ans[j] = A[where[j]][m];
        else
            ans[j] = 0; // free variable
    }
 
    for (int i = 0; i < m; ++i)
        cout << ans[i] << " \n"[i == m - 1];
 
    return 0;
}
```

## Sum of Four Squares [problem](https://cses.fi/problemset/task/3355)
```markdown
題目: 

- 給定一個整數 n（多組測資）。
- 需要找到四個非負整數 a, b, c, d，使得  
  a² + b² + c² + d² = n。
- 如果存在多組解，輸出任意一組即可。
- 由於 n 的範圍相對可控，可以直接枚舉。
```
``` markdown
解法 : 

### 1. 理論背景：
   - 由拉格朗日四平方和定理可知，任意非負整數皆可表示為四個平方數之和。
   - 因此必定有解，只需要找到其中一組即可。

---

### 2. 枚舉策略：
   - 枚舉 a 從 0 到 sqrt(n)。
   - 枚舉 b 從 a 到 sqrt(n - a²)（b ≥ a 可減少重複）。
   - 枚舉 c 從 b 到 sqrt(n - a² - b²)（c ≥ b 同理）。
   - 剩下的值 rem = n - (a² + b² + c²)，判斷是否為完全平方數：
     - d = sqrt(rem)，如果 d² == rem 則找到解。

---

### 3. 複雜度分析：
   - 外層 a 枚舉到 sqrt(n)，b 枚舉到 sqrt(n)，c 枚舉到 sqrt(n)，最壞情況接
   - 近O(n^(3/2))。
   - 由於有提早終止（找到解後立即輸出並結束該測資），實際運行會快得多，適合中等
   - 範圍的 n。

---

### 4. 實作細節：
   - 為避免重複計算平方根，使用 sqrt(rem) 並檢查平方是否相等。
   - b 從 a 開始，c 從 b 開始，確保輸出非降序（符合部分題目要求或方便檢查）。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    ios::sync_with_stdio(0); cin.tie(0);
 
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
 
        bool done = false;
 
        for (int a = 0; a*a <= n && !done; ++a) {
            for (int b = a; a*a+b*b <= n && !done; ++b) {
                for (int c = b; a*a+b*b+c*c <= n && !done; ++c) {
                    int rem = n - (a*a+b*b+c*c);
                    int d = sqrt(rem);
                    if (d*d == rem) {
                        cout << a << " " << b << " " << c << " " << d << '\n';
                        done = true;
                        break;
                    }
                }
            }
        }
    }
}
```

## Triangle Number Sums [problem](https://cses.fi/problemset/task/3406)
```markdown
題目: 

- 定義三角形數為 tri(k) = k(k+1)/2，其中 k 為正整數。
- 對於每個輸入的 n，求最少需要幾個三角形數的和，才能表示成 n。
- 題目保證輸入範圍適合在 long long 計算內。
- 根據數論結果，任何正整數都可以用不超過 3 個三角形數表示（高斯三角形數定理）。
```
``` markdown
解法 : 

### 1. 判斷 1 個三角形數：
   - 若 n 本身是三角形數，答案為 1。
   - 判斷方法：檢查 1 + 8n 是否為完全平方數，且 sqrt(1+8n) - 1 可被 2 整除。

---

### 2. 判斷 2 個三角形數：
   - 設 l 從 1 開始，r 從最大可能的三角形數下標 max_k(n) 開始
   - （tri(max_k) ≤ n）。
 
   - 雙指針法：
     - 若 tri(l) + tri(r) == n，答案為 2。
     - 若和 < n，l++。
     - 若和 > n，r--。
   - 時間複雜度 O(k_max)，其中 k_max ≈ sqrt(2n)。

---

### 3. 判斷 3 個三角形數：
   - 若不屬於上述兩種情況，根據高斯定理可直接輸出 3。
   - 因為定理保證任何正整數皆為 3 個三角形數之和。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
 
// 判斷是否為三角形數
bool is_tri(ll n) {
    ll d = 1 + 8 * n;
    ll sq = sqrtl(d);
    return sq * sq == d && (sq - 1) % 2 == 0;
}
 
// 找到 <= n 的最大三角形數的下標 k
ll max_k(ll n) {
    return (ll)((-1 + sqrtl(1 + 8.0 * n)) / 2);
}
 
// 計算三角形數
inline ll tri(ll k) {
    return k * (k + 1) / 2;
}
 
int solve(ll n) {
    if (is_tri(n)) return 1;
 
    ll l = 1, r = max_k(n);
    while (l <= r) {
        ll sum = tri(l) + tri(r);
        if (sum == n) return 2;
        if (sum < n) ++l;
        else --r;
    }
 
    return 3;
}
 
int main() {
    ios::sync_with_stdio(0), cin.tie(0);
    int T;
    cin >> T;
    while (T--) {
        ll n;
        cin >> n;
        cout << solve(n) << '\n';
    }
}
```

## Dice Probability [problem](https://cses.fi/problemset/task/1725)
```markdown
題目: 

- 擲一顆公平的六面骰子 n 次，每次點數為 1 到 6。
- 給定區間 [a, b]，求最後總和落在該區間內的機率。
- 輸出結果需保留 6 位小數。
```
``` markdown
解法 : 

### 1. 狀態定義：
   - dp[i][sum] = 擲 i 次骰子後，總和恰為 sum 的機率。
   - 初始條件：dp[0][0] = 1（0 次擲骰，總和為 0 的機率為 1）。

---

### 2. 狀態轉移：
   - 對於第 i 次擲骰：
   - dp[i][sum] = Σ_{face=1}^{6} dp[i-1][sum - face] / 6
   - 意思是：最後一次骰出 face，前 i-1 次的總和為 sum - face，每種點數的機率
     相等

---

### 3. 邊界條件：
   - sum 需介於 i（全部擲 1）到 6i（全部擲 6）之間，其他狀況機率為 0。
   - 在計算 dp[i][sum] 時，若 sum-face < 0 則跳過。

---

### 4. 最終答案：
   - 將 dp[n][sum] 在 sum ∈ [a, b] 範圍內的機率加總，即為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define f first
#define s second
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
bool cmp(pLL a, pLL b){
    return (a.f == b.f) ? a.s > b.s : a.f < b.f;
}
 
LL pow(LL n, LL k){
    if(k == 1LL){
        return n;
    }
    if(k == 0LL){
        return 1;
    } 
    LL ret = pow(n, k >> 1) % (MOD);
    ret *= ret % MOD;
    ret %= MOD;
    if(k & 1){
        ret *= n % MOD;
        ret %= MOD;
    }return ret;
}
 
int main() {
    int n, a, b;
    cin >> n >> a >> b;
 
    vector<vector<long double>> dp(n+1, vector<long double>(6*n+1, 0));
    dp[0][0] = 1.0;
 
    for (int i = 1; i <= n; ++i) {
        for (int sum = i; sum <= 6*i; ++sum) {
            for (int face = 1; face <= 6; ++face) {
                if (sum-face >= 0)
                    dp[i][sum] += dp[i-1][sum-face] / 6.0;
            }
        }
    }
 
    long double prob = 0;
    for (int sum = a; sum <= b; ++sum)
        prob += dp[n][sum];
 
    cout << fixed << setprecision(6) << prob << endl;
}
```

## Moving Robots

## Candy Lottery

## Inversion Probability [problem](https://cses.fi/problemset/task/1728)
```markdown
題目: 

- 給定一個長度為 n 的陣列 r，r[i] 表示第 i 個元素的隨機值會均勻分布在
  [1, r[i]]。
- 定義 inversion（逆序對）為：i < j 且 a[i] > a[j]。
- 問所有可能情況下 inversion 的期望值（機率和）。
- 由於數值範圍可能導致精度誤差，本題在 C++ 使用 long double 仍可能 WA，需使用
  高精度計算。
```
``` markdown
解法 : 

### 1. 逆序對的期望公式：
   - 對每一對 (j, i)，其中 j < i，計算：
     P(a[j] > a[i]) = Σ{x=1}^{min(r[j],r[i])} P(a[i] = x) × P(a[j] > x)
   - a[i] 均勻分布在 [1, r[i]]，P(a[i] = x) = 1 / r[i]。
   - P(a[j] > x) = (r[j] - x) / r[j]，若 r[j] > x，否則為 0。

---

### 2. 化簡計算：
   - 設 m = min(r[j], r[i])。
   - Σ_{x=1}^m (r[j] - x) = m × r[j] - m(m+1)/2。
   - 機率和為：
     (a × m - m(m+1)/2) / (a × b)，其中 a = r[j], b = r[i]。

---

### 3. 精度處理：
   - 本題輸出需要 6 位小數，但中間計算涉及大量分數相加，累積誤差極大。
   - 若用 C++ double 或 long double，某些邊界測資會錯（精度不足）。
   - Python 內建 `decimal.Decimal` 支援高精度浮點計算，可以安全通過所有測資
```

``` python
from decimal import Decimal, getcontext
 
getcontext().prec = 30
 
n = int(input())
r = [0] + list(map(int, input().split()))
 
ans = Decimal(0)
 
for i in range(1, n+1):
    for j in range(1, i):
        a = r[j]
        b = r[i]
        m = min(a, b)
        s = Decimal(a*m - m*(m+1)//2)
        ans += s / Decimal(a) / Decimal(b)
 
ans = ans.quantize(Decimal('0.000001'))
 
print(ans)
```

## Stick Game [problem](https://cses.fi/problemset/task/1729)
```markdown
題目: 

- 有一堆長度為 n 的木棍，可以從中取走 p 單位長度（p 在集合 P 中）。
- 兩位玩家輪流取木棍，取走長度必須是 P 中的某一個數值。
- 無法取走合法長度的玩家輸掉遊戲。
- 要輸出對於每個初始長度 i（1 ≤ i ≤ n），先手玩家是贏家 (W) 還是輸家 (L)。
```
``` markdown
解法 : 

### 1. 遊戲定義：
   - dp[i] = true 表示當木棍長度為 i 時，先手必勝（Winning position）。
   - dp[i] = false 表示當木棍長度為 i 時，先手必敗（Losing position）。

---

### 2. 狀態轉移：
   - 對於每個長度 i，檢查是否存在一個可取的長度 p ∈ P：
     - 若 i ≥ p 且 dp[i - p] == false（取走 p 後讓對手處於必敗狀態），
     - 則 dp[i] = true。
     - 否則 dp[i] = false。
   - 這是經典的「取石子遊戲」DP，屬於巴什型博弈。

---

### 3. 初始條件：
   - dp[0] = false（沒有木棍長度時，無法取，必敗）。

---

### 4. 輸出：
   - 依序輸出 i = 1 到 n 的狀態，贏家輸出 'W'，輸家輸出 'L'。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int n, k;
    cin >> n >> k;
    vector<int> P(k);
    for (int i = 0; i < k; i++) cin >> P[i];
 
    vector<bool> dp(n + 1, false); // dp[i] = true if winning
 
    for (int i = 1; i <= n; i++) {
        for (int p : P) {
            if (i >= p && !dp[i - p]) {
                dp[i] = true;
                break;
            }
        }
    }
 
    for (int i = 1; i <= n; i++)
        cout << (dp[i] ? 'W' : 'L');
    cout << '\n';
}
```

## Nim Game I [problem](https://cses.fi/problemset/task/1730)
```markdown
題目: 

- 有 n 堆石子，第 i 堆有 x_i 顆。
- 兩位玩家輪流操作，每次可以從某一堆取走任意正數顆石子。
- 無法操作的玩家輸掉遊戲。
- 給出多組測資，判斷先手玩家 ("first") 或後手玩家 ("second") 獲勝。
```
``` markdown
解法 : 

### 1. 理論背景（Nim 遊戲定理）：
   - 對所有堆的石子數做 XOR，得到 nim-sum。
   - 若 nim-sum ≠ 0，先手必勝；若 nim-sum = 0，後手必勝。

---

### 2. 為什麼成立：
   - nim-sum = 0 為必敗局（P-position）：無論先手怎麼取，都會是 nim-sum ≠ 0 
   - 的局面給對手。
  
   - nim-sum ≠ 0 為必勝局（N-position）：先手可透過操作讓局面為 nim-sum = 0

---

### 3. 演算法步驟：
   1. 初始化 xor_sum = 0。
   2. 對每個堆的石子數 x_i，xor_sum ^= x_i。
   3. 若 xor_sum ≠ 0 → "first"，否則 → "second"。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int t;
    cin >> t;
    while (t--) {
        int n; cin >> n;
        int xor_sum = 0;
        for (int i = 0, x; i < n; ++i) {
            cin >> x;
            xor_sum ^= x;
        }
        cout << (xor_sum ? "first\n" : "second\n");
    }
}
```

## Nim Game II [problem](https://cses.fi/problemset/task/1098)
```markdown
題目: 

- 有 n 堆石子，第 i 堆有 x_i 顆。
- 兩位玩家輪流操作，每次可以從某一堆取走 1、2 或 3 顆石子。
- 無法操作的玩家輸掉遊戲。
- 多組測資，需判斷先手 ("first") 或後手 ("second") 獲勝。
```
``` markdown
解法 : 

### 1. Sprague–Grundy 理論：
   - 每一堆的局面可抽象成「取走 1、2、3 顆石子」的子遊戲。
   - Grundy 值定義：
     - G(0) = 0（無石子，必敗）。
     - G(1) = mex{ G(0) } = 1。
     - G(2) = mex{ G(1), G(0) } = 2。
     - G(3) = mex{ G(2), G(1), G(0) } = 3。
     - G(4) = mex{ G(3), G(2), G(1) } = 0。
   - 可以發現規律：G(x) = x % 4。

---

### 2. 判勝條件：
   - 計算所有堆的 Grundy 值的 XOR（nim-sum）。
   - 若 nim-sum = 0 → 後手勝。
   - 若 nim-sum ≠ 0 → 先手勝。

---

### 3. 演算法步驟：
   1. 初始化 xor_sum = 0。
   2. 對每堆石子數 x，計算 g = x % 4。
   3. xor_sum ^= g。
   4. 輸出勝者。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
// Grundy(x) = x % 4, 因為拿法是 {1, 2, 3}
int get_sg(int x) {
    return x % 4;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
 
        int xor_sum = 0;
        for (int i = 0; i < n; ++i) {
            int x;
            cin >> x;
            xor_sum ^= get_sg(x);
        }
 
        cout << (xor_sum == 0 ? "second\n" : "first\n");
    }
}
```

## Stair Game [problem](https://cses.fi/problemset/task/1099)
```markdown
題目: 

- 有 N 個台階（從 0 編號到 N-1），每個台階上有 p 顆球。
- 兩位玩家輪流操作，每次可以選擇某個台階，將該台階上的球向下移到更低的台階
 （可以一次移動任意數量的球）。
- 無法移動的玩家輸掉遊戲。
- 多組測資，需判斷先手 ("first") 或後手 ("second") 獲勝。
```
``` markdown
解法 : 

### 1. Sprague–Grundy 分析：
   - 對於編號為 i 的台階，其 Grundy 值為：
     - G(i) = i，如果允許一次移動任意數量的球往更低台階。
   - 但這題的移動限制與台階位置奇偶性有關：
     - 當台階編號為偶數時，該堆球的 Grundy 值為 0（因為只能移到更低的偶數層
     - ，等價於無影響）。
     - 當台階編號為奇數時，該堆球的 Grundy 值為球數 p（因為等價於 Nim 堆）。

---

### 2. 化簡成 Nim：
   - 僅對奇數編號的台階，將該層的球數視為一堆 Nim 堆石子。
   - 對所有奇數編號台階的 p 做 XOR（nim-sum）。

---

### 3. 判勝條件：
   - 若 nim-sum = 0 → 後手勝。
   - 若 nim-sum ≠ 0 → 先手勝。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int T, N, p, xor_sum;
 
int main() {
    scanf("%d", &T);
    while (T--) {
        scanf("%d", &N);
        xor_sum = 0;
        for (int i = 0; i < N; ++i) {
            scanf("%d", &p);
            // 若某樓梯上球數為奇數，則其對應 Grundy 值為 i
            if (i % 2 == 1) {
                xor_sum ^= p;
            }
        }
        // XOR 結果決定勝負：0 -> second wins, non-zero -> first wins
        printf(xor_sum ? "first\n" : "second\n");
    }
}
```

## Grundy's Game [problem](https://cses.fi/problemset/task/2207)
```markdown
題目: 

- 有一堆 N 顆石子。
- 每次可以將這一堆石子分成兩堆，且兩堆石子數量必須不同（禁止平均分）。
- 無法操作的玩家輸掉遊戲。
- 多組測資，需判斷先手 ("first") 或後手 ("second") 獲勝。
```
``` markdown
解法 : 

### 1. 遊戲規則轉換：
   - 每個局面只有一堆石子，能夠進行的唯一操作是「分堆」。
   - 分堆後產生兩個子局面，後續遊戲在兩個子局面上獨立進行  
   -（這是 Sprague–Grundy 遊戲的典型結構）。
   - 規則限制：兩堆數量必須不同，等於禁止將偶數堆均分。

---

### 2. Grundy 值計算：
   - G(n) = mex{ G(a) ⊕ G(b) }，其中 a + b = n 且 a ≠ b。
   - 此遊戲已知只有有限個必敗局（Grundy 值為 0 的局面）。
   - lose[] 陣列即是事先計算好的必敗局 N 值列表。
   - 若 N 在 lose[] 中 → Grundy 值為 0 → 後手勝。
   - 否則 → Grundy 值非零 → 先手勝。

---

### 3. 為什麼可以預先列舉：
   - Grundy’s Game 的必敗局並非規律簡單的等差序列，但範圍內可以透過離線
   - DP 預先計算出來。
   - 題目中 lose[] 包含所有 N ≤ 1222 的必敗局，且實際測資保證 N 落在這個範圍
```

``` cpp
#include <bits/stdc++.h>
 
using namespace std;
const int maxN = 1e6+1;
 
/**
 * A036685
 * Retrivied from https://oeis.org/A036685
 */
 
int T, lose[42] = { 0, 1, 2, 4, 7, 10, 20, 23, 26, 50, 53, 270, 273, 276, 282, 285, 288, 316, 334, 337, 340, 346, 359, 362, 365, 386, 389, 392, 566, 630, 633, 636, 639, 673, 676, 682, 685, 923, 926, 929, 932, 1222 };
bool b[maxN];
 
void init(){
    for(int x : lose)
        b[x] = true;
}
 
int main(){
    init();
    scanf("%d", &T);
    for(int t = 0, N; t < T; t++){
        scanf("%d", &N);
        printf("%s\n", b[N] ? "second" : "first");
    }
}
```

## Another Game
# Tree Algorithms(16 題)
## Subordinates [problem](https://cses.fi/problemset/task/1674)
```markdown
題目: 

- 有 n 個員工（編號 1 到 n），其中第 1 號是總老闆。
- 每個員工除了老闆以外都有唯一上司。
- 給定每位員工的上司，構成一棵以 1 為根的樹。
- 要求輸出每位員工（1~n）底下有多少個子孫（直接或間接的下屬）。
```
``` markdown
解法 : 

### 1. 樹的子節點數量統計：
   - 題目實質上是計算「每個節點的子樹大小 - 1」。
   - 可以使用 DFS 或拓撲排序反向累加的方式。

---

### 2. 使用反向拓撲排序處理：
   - 把每個人指向他們的上司形成邊 edge[i]。
   - 統計每個點的 indegree（入邊數），即有多少人視他為上司。
   - 從葉子節點（沒有下屬）開始，將其對應貢獻往上加：
     - ans[edge[v]] += ans[v] + 1
   - 最後每個 ans[i] 就是第 i 號員工的下屬總數。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long ll;
 
int main() {
    fastio;
    int n;
    cin >> n;
    vector<int> edge(n + 1);
    vector<int> indegree(n + 1, 0);
    for(int i = 2; i <= n; ++i){
        cin >> edge[i];
        indegree[edge[i]]++;
    }
    
    queue<int> q;
    for(int i = 2; i <= n; ++i){
        if(!indegree[i])
            q.push(i);
    }
 
    vector<ll> ans(n + 1, 0);
    while(!q.empty()){
        int v = q.front();
        q.pop();
        indegree[edge[v]]--;
        ans[edge[v]] += ans[v] + 1;
        if(indegree[edge[v]] == 0){
            q.push(edge[v]);
        }
    }
 
    for(int i = 1; i <= n; ++i){
        cout << ans[i] << ' ';
    }
}
```

## Tree Matching [problem](https://cses.fi/problemset/task/1130)
```markdown
題目: 

- 給定一棵 n 個節點的無向樹。
- 定義一個「matching」是指選出一些邊，且每個節點最多只能在一條選中的邊上出現一次。
- 問最多能選出幾條邊來構成 matching。
```
``` markdown
解法 : 

### 1. 樹上 DP 設計：
   - 定義 dp[u][0]：u 不與其子節點配對時，子樹內的最大 matching 數。
   - 定義 dp[u][1]：u 與某個子節點 v 配對時，子樹內的最大 matching 數。

---

### 2. 狀態轉移：
   - `dp[u][0] = Σ max(dp[v][0], dp[v][1])`：u 不配對，則每個子節點可以自由選擇配不配對。
   - `dp[u][1] = max over v: 1 + dp[v][0] + (sum - max(dp[v][0], dp[v][1]))`：
     - 嘗試與某個 v 配對，獲得 1 分。
     - v 的子樹不能再配對（只能加 dp[v][0]）
     - 其他子節點仍是自由配對的最大值。
     - 整理成 `dp[u][1] = max(...)` 的形式更新。

---

### 3. 終點答案：
   - 根據 dp[1][0] 和 dp[1][1] 中的最大值為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5+5;
vector<int> g[N];
int dp[N][2];
 
void dfs(int u, int p) {
    dp[u][0] = 0;
    dp[u][1] = 0;
 
    int sum = 0;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs(v, u);
        sum += max(dp[v][0], dp[v][1]);
    }
 
    dp[u][0] = sum;
 
    for (int v : g[u]) {
        if (v == p) continue;
        dp[u][1] = max(dp[u][1], 1 + dp[v][0] + sum - max(dp[v][0], dp[v][1]));
    }
}
 
int main() {
    int n;
    cin >> n;
    for (int i = 1; i < n; i++) {
        int u,v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs(1,0);
 
    cout << max(dp[1][0], dp[1][1]) << '\n';
}
```

## Tree Diameter [problem](https://cses.fi/problemset/task/1131)
```markdown
題目: 

- 給定一棵有 n 個節點的樹（無向、無環連通圖）。
- 詢問這棵樹的 **直徑**（即距離最遠的兩個節點間的距離）。
- 節點編號從 1 到 n。
```
``` markdown
解法 : 

### 1. 樹的直徑定義與技巧：
   - 樹的直徑 = 任一節點出發，最遠的節點 A；
     再從 A 出發，走到最遠的節點 B，這段距離就是直徑。
   - 這是經典「兩次 DFS」的技巧：
     - 第一次 DFS 找到最遠點 A（作為直徑端點之一）
     - 第二次 DFS 從 A 出發，求最遠距離 = 直徑長度

---

### 2. 為什麼有效：
   - 第一趟 DFS 保證找到某個直徑端點。
   - 第二趟 DFS 保證從此端點出發，走出真正的直徑距離。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
vector<vector<int>> g;
int farthest_node, max_dist;
 
void dfs(int u, int parent, int dist) {
    if (dist > max_dist) {
        max_dist = dist;
        farthest_node = u;
    }
    for (int v : g[u]) {
        if (v != parent) {
            dfs(v, u, dist + 1);
        }
    }
}
 
int main() {
    int n;
    cin >> n;
    g.resize(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    max_dist = -1;
    dfs(1, -1, 0);  // 第一次
    int start = farthest_node;
 
    max_dist = -1;
    dfs(start, -1, 0);  // 第二次
    cout << max_dist << endl;
}
```

## Tree Distances I [problem](https://cses.fi/problemset/task/1132)
```markdown
題目: 

- 給定一棵有 n 個節點的樹。
- 對每個節點 i，輸出它與樹上最遠節點的距離。
- 節點編號為 1~n。
```
``` markdown
解法 : 

### 1. 關鍵觀察：最遠點一定在樹的直徑上
   - 任意節點與其他節點的最遠距離，一定是通往樹直徑端點之一的距離。
   - 所以，只要找出樹的直徑兩端 u₁ 和 u₂，對每個節點 u：
     - 答案為 `max(dist(u, u₁), dist(u, u₂))`

---

### 2. 實作步驟（3 次 BFS）：
   1. 從任一點（例如 1）BFS，找出距離最遠的點 `u₁`（直徑的一端）
   2. 從 `u₁` BFS 找到 `u₂`，同時計算所有點到 `u₁` 的距離 `dist1[]`
   3. 從 `u₂` BFS 計算所有點到 `u₂` 的距離 `dist2[]`
   4. 對於每個節點 u，輸出 `max(dist1[u], dist2[u])`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5;
vector<int> g[N];
int dist1[N], dist2[N], n;
 
// 快速輸入
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}
 
// BFS，返回最遠的點，並記錄距離
int bfs(int start, int dist[]) {
    queue<int> q;
    fill(dist, dist + n + 1, -1);
    dist[start] = 0;
    q.push(start);
    int farthest = start;
 
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
                if (dist[v] > dist[farthest]) {
                    farthest = v;
                }
            }
        }
    }
    return farthest;
}
 
int main() {
    fastio();
 
    cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    int u1 = bfs(1, dist1);        // 找到直徑一端
    int u2 = bfs(u1, dist1);      // 找到另一端，更新 dist1
    bfs(u2, dist2);               // 計算到另一端的距離
 
    for (int u = 1; u <= n; u++) {
        cout << max(dist1[u], dist2[u]) << " ";
    }
    cout << "\n";
}
```

## Tree Distances II [problem](https://cses.fi/problemset/task/1133)
```markdown
題目: 

- 給定一棵有 n 個節點的樹，節點編號 1~n。
- 對每個節點 i，輸出它與所有其他節點的距離總和。
```
``` markdown
解法 : 

### 1. 定義：
   - `dp[u]`：節點 u 到所有其他節點的距離總和。
   - `sz[u]`：以 u 為根的子樹大小。

---

### 2. 第一次 DFS：自底向上計算根為 1 的狀態
   - 從節點 1 為根，計算：
     - `sz[u] = 所有子樹大小加總 + 1`
     - `dp[u] = 所有子節點的 dp[v] + sz[v]`（v 是 u 的兒子）
   - 最終 `dp[1]` 就是節點 1 的答案。

---

### 3. 第二次 DFS：換根遞推 dp[v]
   - 若我們已知 `dp[u]`，要算 dp[v]：
     - 當從 u 換根到 v，整棵樹的距離總和變化為：
     - dp[v] = dp[u] - sz[v] + (n - sz[v])
     - 因為 v 子樹內的節點距離會 -1，其餘節點距離 +1。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5;
vector<int> g[N];
int sz[N];
long long dp[N];
int n;
 
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}
 
// 第一次 DFS: 計算子樹大小 + 根距離和
void dfs1(int u, int p) {
    sz[u] = 1;
    dp[u] = 0;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        dp[u] += dp[v] + sz[v];
    }
}
 
// 第二次 DFS: 換根 DP
void dfs2(int u, int p) {
    for (int v : g[u]) {
        if (v == p) continue;
        dp[v] = dp[u] - sz[v] + (n - sz[v]);
        dfs2(v, u);
    }
}
 
int main() {
    fastio();
    cin >> n;
    for (int i = 0; i < n-1; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs1(1, 0);
    dfs2(1, 0);
 
    for (int u = 1; u <= n; u++) {
        cout << dp[u] << " ";
    }
    cout << "\n";
}
```

## Company Queries I [problem](https://cses.fi/problemset/task/1687)
```markdown
題目: 

- 給定一棵以節點 1 為根的樹（每個節點都有唯一父節點，除了根節點）。
- 有 q 筆查詢，每次詢問：從節點 x 向上跳 k 步後會到哪個節點？若不存在則輸出 -1。
- 節點編號為 1~n。
```
``` markdown
解法 : 

### 1. 這是典型的倍增（Binary Lifting）問題：
   - 預先計算每個節點向上跳 2^j 步會到哪個祖先節點：
     - `up[u][0] = 父節點`
     - `up[u][j] = up[ up[u][j-1] ][j-1]`

---

### 2. 查詢操作：
   - 對於每筆查詢 (x, k)，將 k 進行二進位拆解。
   - 若第 j 位為 1，則從 x = up[x][j] 跳過去。
   - 過程中若 x 跳到 -1，表示已經到達根或無法再往上跳。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5, LOG = 20;
int up[N][LOG];
int n, q;
 
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}
 
int main() {
    fastio();
 
    cin >> n >> q;
 
    for (int u = 2; u <= n; u++) {
        cin >> up[u][0];  // u 的父節點
    }
    up[1][0] = -1;
    // 建立倍增表
    for (int j = 1; j < LOG; j++) {
        for (int u = 1; u <= n; u++) {
            up[u][j] = up[u][j-1] == -1? -1: up[up[u][j-1]][j-1];
        }
    }
 
    while (q--) {
        int x, k;
        cin >> x >> k;
        for (int j = 0; j < LOG; j++) {
            if (k & (1 << j)) {
                if (x == -1) break;
                x = up[x][j];
            }
        }
        cout << (x == -1 ? -1 : x) << "\n";
    }
}
```

## Company Queries II [problem](https://cses.fi/problemset/task/1688)
```markdown
題目: 

- 給定一棵以節點 1 為根的有根樹，每個節點有唯一父節點（除了根）。
- 有 q 筆查詢，每次給兩個節點 a、b，詢問它們的最近公共祖先（LCA）。
- 節點編號為 1~n。
```
``` markdown
解法 : 

### 1. 使用 Binary Lifting（倍增法）求 LCA：
   - 預處理每個節點的 2^j 階祖先 `up[u][j]`
   - 同時記錄每個節點的深度 `depth[u]`

---

### 2. 最近公共祖先（LCA）的三個步驟：
   - 若 `depth[u] < depth[v]`，先 swap 保證 u 比 v 深
   - 把 u 向上跳 `depth[u] - depth[v]` 步，拉到與 v 同層
   - 從高到低嘗試同時跳，直到找到第一個共同祖先（或兩者相同）

---

### 3. lift(u, k)：將節點 u 往上跳 k 步
   - 利用 binary lifting：檢查每一位是否為 1，就跳對應距離
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5, LOG = 20;
int up[N][LOG], depth[N];
vector<int> g[N];
int n, q;
 
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}
 
void dfs(int u, int p) {
    up[u][0] = p;
    for (int j = 1; j < LOG; j++) {
        if (up[u][j-1] > 0) {
            up[u][j] = up[up[u][j-1]][j-1];
        } else {
            up[u][j] = -1;
        }
    }
 
    for (int v : g[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    }
}
 
int lift(int u, int k) {
    for (int j = 0; j < LOG; j++) {
        if (k & (1 << j)) {
            u = up[u][j];
            if (u == -1) break;
        }
    }
    return u;
}
 
int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
 
    u = lift(u, depth[u] - depth[v]);
    if (u == v) return u;
 
    for (int j = LOG-1; j >= 0; j--) {
        if (up[u][j] != -1 && up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0];
}
 
int main() {
    fastio();
 
    cin >> n >> q;
    for (int u = 2; u <= n; u++) {
        int p; cin >> p;
        g[p].push_back(u);
        g[u].push_back(p);
    }
 
    dfs(1, -1);
 
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << lca(a, b) << "\n";
    }
}
```

## Distance Queries [problem](https://cses.fi/problemset/task/1135)
```markdown
題目: 

- 給定一棵有 n 個節點的無向樹（1~n 節點編號）。
- 有 q 次查詢，每次給定兩個節點 a、b，詢問它們之間的距離（經過幾條邊）。
```
``` markdown
解法 : 

### 1. 轉換成最近公共祖先（LCA）問題：
   - 在樹上，兩點間距離可由深度表示為：
   - dist(a, b) = depth[a] + depth[b] - 2 × depth[lca(a, b)]
   - 所以只要能快速求出 LCA 和深度，即可計算距離。

---

### 2. 使用 Binary Lifting 預處理 LCA：
   - `up[u][j]` 表示從節點 u 向上跳 2^j 步會到達哪個節點。
   - 使用 DFS 計算每個節點的 `depth[]` 與 `up[][]`。

---

### 3. 查詢：
   - 若兩點深度不同，先讓深度深的向上跳至相同高度。
   - 再從高往低跳，直到找到最近公共祖先。
   - 根據上述公式計算距離。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5, LOG = 20;
int up[N][LOG], depth[N];
vector<int> g[N];
int n, q;
 
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}
 
void dfs(int u, int p) {
    up[u][0] = p;
    for (int j = 1; j < LOG; j++) {
        if (up[u][j-1] > 0) {
            up[u][j] = up[up[u][j-1]][j-1];
        } else {
            up[u][j] = -1;
        }
    }
 
    for (int v : g[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    }
}
 
int lift(int u, int k) {
    for (int j = 0; j < LOG; j++) {
        if (k & (1 << j)) {
            u = up[u][j];
            if (u == -1) break;
        }
    }
    return u;
}
 
int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
 
    u = lift(u, depth[u] - depth[v]);
    if (u == v) return u;
 
    for (int j = LOG-1; j >= 0; j--) {
        if (up[u][j] != -1 && up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0];
}
 
int main() {
    fastio();
 
    cin >> n >> q;
    for (int i = 0; i < n-1; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs(1, -1);
 
    while (q--) {
        int a, b;
        cin >> a >> b;
        int ancestor = lca(a, b);
        int dist = depth[a] + depth[b] - 2 * depth[ancestor];
        cout << dist << "\n";
    }
}
```

## Counting Paths [problem](https://cses.fi/problemset/task/1136)
```markdown
題目: 

- 給定一棵 n 個節點的無向樹（節點編號 1~n）。
- 有 m 筆查詢，每次詢問一條從節點 a 到節點 b 的路徑。
- 最後要輸出對每個節點 x，總共有多少條路徑經過 x（包含端點）。
```
``` markdown
解法 : 

### 1. 對每條路徑貢獻進行差分標記：
   - 觀察：若一條路徑從 a → b，則該路徑會對這三個節點產生貢獻：
     - `cnt[a]++`, `cnt[b]++`
     - `cnt[lca(a, b)]--`：LCA 只會被算一次，所以要扣除
     - `cnt[ parent[lca(a, b)] ]--`：因為 LCA 的父親不在路徑上，但會被加兩次，需扣掉一次

---

### 2. 使用 Binary Lifting 預處理 LCA：
   - 利用 `up[u][j]` 表示節點 u 往上跳 2^j 層的祖先
   - 用 DFS 建立 depth 與 up[][] 表
   - 查詢 lca(a, b) 時先將 a 與 b 提升到相同深度，然後同步往上跳直到相遇

---

### 3. 統一收集所有路徑貢獻（自底向上 DFS）：
   - 每個節點收集其所有子節點的貢獻，加總為自己的貢獻
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5, LOG = 20;
vector<int> g[N];
int up[N][LOG], depth[N];
int cnt[N];
int n, m;
 
void fastio() {
    ios::sync_with_stdio(0);
    cin.tie(0);
}
 
void dfs(int u, int p) {
    up[u][0] = p;
    for (int j = 1; j < LOG; j++) {
        if (up[u][j-1] != -1)
            up[u][j] = up[up[u][j-1]][j-1];
        else
            up[u][j] = -1;
    }
 
    for (int v : g[u]) {
        if (v == p) continue;
        depth[v] = depth[u] + 1;
        dfs(v, u);
    }
}
 
int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
 
    // 提升 u 到和 v 同一層
    for (int j = LOG-1; j >= 0; j--) {
        if (up[u][j] != -1 && depth[up[u][j]] >= depth[v])
            u = up[u][j];
    }
 
    if (u == v) return u;
 
    for (int j = LOG-1; j >= 0; j--) {
        if (up[u][j] != -1 && up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
 
    return up[u][0];
}
 
// 回收子樹的貢獻
void collect(int u, int p) {
    for (int v : g[u]) {
        if (v == p) continue;
        collect(v, u);
        cnt[u] += cnt[v];
    }
}
 
int main() {
    fastio();
 
    cin >> n >> m;
    for (int i = 1; i < n; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    memset(up, -1, sizeof(up));
    dfs(1, -1);
 
    while (m--) {
        int a, b;
        cin >> a >> b;
        int l = lca(a, b);
 
        cnt[a]++;
        cnt[b]++;
        cnt[l]--;
        if (up[l][0] != -1) cnt[up[l][0]]--;
    }
 
    collect(1, -1);
 
    for (int i = 1; i <= n; i++) {
        cout << cnt[i] << " ";
    }
    cout << "\n";
}
```

## Subtree Queries [problem](https://cses.fi/problemset/task/1137)
```markdown
題目: 

- 給定一棵 n 個節點的樹（節點編號 1~n）。
- 每個節點都有一個初始整數值。
- 有 q 次操作，分為兩種：
  1. `1 s x`：將節點 s 的值設為 x。
  2. `2 s`：詢問整棵以節點 s 為根的子樹中，所有節點值的總和。
```
``` markdown
解法 : 

### 1. 將樹展平成序列（Euler Tour / DFS flattening）：
   - 利用 DFS 時記錄每個節點的 `tin[u]`（進入時間）與 `tout[u]`（離開時間）
   - 對於一個節點 s，其子樹的節點在 DFS 序上正好是連續的範圍 [tin[s], tout[s]]

---

### 2. 使用 Binary Indexed Tree（Fenwick Tree）維護 DFS 序上的值：
   - 在 `tin[u]` 的位置加入對應 value[u]，即能將整棵樹壓成一維陣列
   - 更新節點值時，只要更新 `tin[u]` 的對應位置
   - 查詢子樹總和時，只需對區間 [tin[s], tout[s]] 做區間總和查詢
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
const int N = 2e5 + 5;
 
vector<int> g[N];
int n, q;
ll value[N];       // 原始值
ll bit[N * 2];     // BIT
int tin[N], tout[N], flat[N], timer = 0;
 
void dfs(int u, int p) {
    tin[u] = ++timer;
    flat[timer] = u;   // 在 dfs 序列上記錄這是誰
    for (int v : g[u]) {
        if (v == p) continue;
        dfs(v, u);
    }
    tout[u] = timer;
}
 
void add(int i, ll x) {
    for (; i <= n; i += i & -i) bit[i] += x;
}
 
ll sum(int i) {
    ll res = 0;
    for (; i > 0; i -= i & -i) res += bit[i];
    return res;
}
 
ll range(int l, int r) {
    return sum(r) - sum(l-1);
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> value[i];
 
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs(1, 0);
 
    // 初始化 BIT
    for (int i = 1; i <= n; i++) {
        add(tin[i], value[i]);
    }
 
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int s; ll x;
            cin >> s >> x;
            ll delta = x - value[s];
            value[s] = x;
            add(tin[s], delta);
        } else {
            int s;
            cin >> s;
            cout << range(tin[s], tout[s]) << '\n';
        }
    }
}
```

## Path Queries [problem](https://cses.fi/problemset/task/1138)
```markdown
題目: 

- 給定一棵 n 個節點的樹，每個節點初始有一個值。
- 有 q 筆操作，共兩種：
  1. `1 s x`：將節點 s 的值設為 x。
  2. `2 s`：詢問從根節點 1 到節點 s 的路徑上所有節點值的總和。
```
``` markdown
解法 : 

### 1. 使用重鏈剖分（HLD, Heavy-Light Decomposition）+ Segment Tree：
   - 目標是能高效查詢根到任一節點的「路徑總和」並支援單點修改。
   - HLD 可將樹的每條重鏈壓平成 DFS 編號區間，使得路徑查詢可分段處理。

---

### 2. HLD 預處理步驟：
   - `dfs1(u, p)`：
     - 計算每個節點的子樹大小 `sz[u]`，找出重兒子 `son[u]`
   - `dfs2(u, tp)`：
     - 建立每個節點的 DFS 編號 `tid[u]`
     - 記錄每條重鏈的頂端 `top[u]`
     - 編號與原節點對應關係記於 `rnk[]`

---

### 3. 使用 Segment Tree 維護節點值：
   - 建樹：`build()` 根據 DFS 編號建立
   - 修改：單點修改 `update()`
   - 查詢：區間總和 `query()`，用於分段查詢 root 到 u 的路徑

---

### 4. 處理查詢：
   - 對於根到某節點 u 的路徑總和：
     - 沿著重鏈往上跳，對每段區間用 Segment Tree 查詢
     - 最後加上頂端的區間即可完成整條路徑查詢
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
const int N = 2e5 + 5;
 
vector<int> g[N];
int n, q, timer;
ll value[N];
 
// HLD
int sz[N], dep[N], fa[N], son[N];
int top[N], tid[N], rnk[N];
 
// segtree
ll seg[N*4];
 
void dfs1(int u, int p) {
    sz[u] = 1;
    fa[u] = p;
    dep[u] = dep[p] + 1;
    int maxson = -1;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        if (sz[v] > maxson) {
            son[u] = v;
            maxson = sz[v];
        }
    }
}
 
void dfs2(int u, int tp) {
    top[u] = tp;
    tid[u] = ++timer;
    rnk[tid[u]] = u;
    if (!son[u]) return;
    dfs2(son[u], tp);
    for (int v : g[u]) {
        if (v == fa[u] || v == son[u]) continue;
        dfs2(v, v);
    }
}
 
// segtree
void build(int id, int l, int r) {
    if (l == r) {
        seg[id] = value[rnk[l]];
        return;
    }
    int m = (l+r)>>1;
    build(id<<1, l, m);
    build(id<<1|1, m+1, r);
    seg[id] = seg[id<<1] + seg[id<<1|1];
}
 
void update(int id, int l, int r, int pos, ll val) {
    if (l == r) {
        seg[id] = val;
        return;
    }
    int m = (l+r)>>1;
    if (pos <= m) update(id<<1, l, m, pos, val);
    else update(id<<1|1, m+1, r, pos, val);
    seg[id] = seg[id<<1] + seg[id<<1|1];
}
 
ll query(int id, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return seg[id];
    int m = (l+r)>>1;
    ll res = 0;
    if (ql <= m) res += query(id<<1, l, m, ql, qr);
    if (qr > m) res += query(id<<1|1, m+1, r, ql, qr);
    return res;
}
 
// 查 root → u 的路徑和
ll path_query(int u) {
    ll res = 0;
    while (top[u] != 1) {
        res += query(1, 1, n, tid[top[u]], tid[u]);
        u = fa[top[u]];
    }
    res += query(1, 1, n, tid[1], tid[u]);
    return res;
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> value[i];
 
    for (int i = 1; i < n; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs1(1, 0);
    dfs2(1, 1);
    build(1, 1, n);
 
    while (q--) {
        int op, s;
        cin >> op >> s;
        if (op == 1) {
            ll x; cin >> x;
            update(1, 1, n, tid[s], x);
        } else {
            cout << path_query(s) << '\n';
        }
    }
}
```

## Path Queries II [problem](https://cses.fi/problemset/task/2134)
```markdown
題目: 

- 給定一棵 n 個節點的樹，每個節點初始有一個整數值。
- 有 q 筆操作，分為兩種：
  1. `1 s x`：將節點 s 的值設為 x。
  2. `2 s x`：詢問從節點 s 到節點 x 的路徑上，最大值為多少。
```
``` markdown
解法 : 

### 1. 使用 Heavy-Light Decomposition（HLD）+ Segment Tree：
   - 將樹做重鏈剖分，將每條重鏈壓成 DFS 編號連續的區間。
   - 使用 Segment Tree 在 DFS 編號序上維護最大值。
   - 支援單點修改與路徑最大值查詢。

---

### 2. 預處理：
   - `dfs1(u, p)`：計算每個節點子樹大小 `sz[u]`，找出重兒子 `son[u]`。
   - `dfs2(u, tp)`：建立 DFS 編號 `tid[u]` 與重鏈頂 `top[u]`。
   - `build()`：將 DFS 編號序上的節點值建立 Segment Tree。

---

### 3. 查詢路徑最大值：
   - 分段跳躍至同一條重鏈：
     - 每段查詢對應 DFS 區間 `[tid[top[u]], tid[u]]`
     - 跳至上層的父鏈，直到兩點在同一條鏈上
     - 最後查詢同一鏈上 `[tid[u], tid[v]]`

---

### 4. 修改操作：
   - 單點修改：將 `value[s]` 改為 x，只需更新 DFS 編號 `tid[s]` 在 Segment Tree 上的位置。
```

``` cpp
#include <bits/stdc++.h>
#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,popcnt,lzcnt")
using namespace std;
 
typedef long long ll;
const int N = 2e5 + 5;
 
vector<int> g[N];
int n, q, timer;
int value[N];
 
// HLD
int sz[N], dep[N], fa[N], son[N];
int top[N], tid[N], rnk[N];
 
// segtree
int seg[N*4];
 
void dfs1(int u, int p) {
    sz[u] = 1;
    fa[u] = p;
    dep[u] = dep[p] + 1;
    int maxson = -1;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        if (sz[v] > maxson) {
            son[u] = v;
            maxson = sz[v];
        }
    }
}
 
void dfs2(int u, int tp) {
    top[u] = tp;
    tid[u] = ++timer;
    rnk[tid[u]] = u;
    if (!son[u]) return;
    dfs2(son[u], tp);
    for (int v : g[u]) {
        if (v == fa[u] || v == son[u]) continue;
        dfs2(v, v);
    }
}
 
// segtree
void build(int id, int l, int r) {
    if (l == r) {
        seg[id] = value[rnk[l]];
        return;
    }
    int m = (l+r)>>1;
    build(id<<1, l, m);
    build(id<<1|1, m+1, r);
    seg[id] = max(seg[id<<1] , seg[id<<1|1]);
}
 
void update(int id, int l, int r, int pos, int val) {
    if (l == r) {
        seg[id] = val;
        return;
    }
    int m = (l+r)>>1;
    if (pos <= m) update(id<<1, l, m, pos, val);
    else update(id<<1|1, m+1, r, pos, val);
    seg[id] = max(seg[id<<1] , seg[id<<1|1]);
}
 
int query(int id, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return seg[id];
    int m = (l+r)>>1;
    int res = INT_MIN;
    if (ql <= m) res = max(res, query(id<<1, l, m, ql, qr));
    if (qr > m) res = max(res, query(id<<1|1, m+1, r, ql, qr));
    return res;
}
 
// 查 root → u 的路徑和
int path_query(int u, int v) {
    int res = INT_MIN;  // 因為是求最大值
    while (top[u] != top[v]) {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        res = max(res, query(1, 1, n, tid[top[u]], tid[u]));
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) swap(u, v);
    res = max(res, query(1, 1, n, tid[u], tid[v]));
    return res;
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> value[i];
 
    for (int i = 1; i < n; i++) {
        int u, v; cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs1(1, 0);
    dfs2(1, 1);
    build(1, 1, n);
 
    while (q--) {
        int op, s;
        cin >> op >> s;
        if (op == 1) {
            int x; cin >> x;
            update(1, 1, n, tid[s], x);
        } else {
            int x; cin >> x;
            cout << path_query(s, x) << ' ';
        }
    }
}
```

## Distinct Colors [problem](https://cses.fi/problemset/task/1139)
```markdown
題目: 

- 給定一棵有 n 個節點的樹，每個節點有一種顏色。
- 對每個節點 u，輸出以 u 為根的子樹中，有幾種**不同的顏色**。
```
``` markdown
解法 : 

### 1. Heavy-Light 合併策略（DSU on Tree）：
   - dfs1 預處理每個子樹大小與重兒子（最大子樹）。
   - dfs2 先處理所有輕兒子，最後處理重兒子並沿用其 map 以減少記憶體與運算量。
   - 每個節點維護一份 map，記錄顏色出現次數，並在處理完所有子節點後更新答案。

---

### 2. 為何重兒子要最後處理：
   - 因為重兒子的子樹大，保留其 map 可以節省將其他子樹合併進來的成本。
   - 輕兒子的 map 都是暫時使用，合併完後可以刪除回收記憶體。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5+5;
 
vector<int> g[N];
int sz[N], son[N], c[N], ans[N];
map<int,int>* cnt[N];
int n;
 
void dfs1(int u, int p) {
    sz[u] = 1;
    son[u] = 0;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs1(v, u);
        sz[u] += sz[v];
        if (!son[u] || sz[v] > sz[son[u]]) son[u] = v;
    }
}
 
void dfs2(int u, int p) {
    // 先處理輕兒子
    for (int v : g[u]) {
        if (v == p || v == son[u]) continue;
        dfs2(v, u);
    }
 
    // 再處理重兒子
    if (son[u]) {
        dfs2(son[u], u);
        cnt[u] = cnt[son[u]];
    } else {
        cnt[u] = new map<int,int>();
    }
 
    // 把輕兒子的顏色合併進來
    (*cnt[u])[c[u]]++;
    for (int v : g[u]) {
        if (v == p || v == son[u]) continue;
        for (auto& kv : *cnt[v]) {
            (*cnt[u])[kv.first] += kv.second;
        }
        delete cnt[v];  // 回收輕兒子的內存
    }
 
    ans[u] = cnt[u]->size();
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> c[i];
    for (int i = 1; i < n; i++) {
        int u,v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs1(1,0);
    dfs2(1,0);
 
    for (int i = 1; i <= n; i++) cout << ans[i] << ' ';
    cout << '\n';
}
```

## Finding a Centroid [problem](https://cses.fi/problemset/task/2079)
```markdown
題目: 

- 給定一棵有 n 個節點的樹，請找出樹的 **重心 (centroid)**。
- 樹的重心定義為：**刪除該節點後，所有連通塊的大小都不超過 n/2。**
```
``` markdown
解法 : 

### 1. 子樹大小預處理：
   - dfs(u, p)：計算每個節點的子樹大小 sz[u]。
   - sz[u] = 1 + 所有孩子的 sz[v]。

---

### 2. 判斷是否為重心：
   - 對於每個節點 u，檢查：
     - 子節點 v：如果 sz[v] > n/2，則不符合。
     - 父節點方向的補樹：n - sz[u] 也不能 > n/2。
   - 如果都滿足，就輸出該節點。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5+5;
vector<int> g[N];
int sz[N];
int n;
 
void dfs(int u, int p) {
    sz[u] = 1;
    for (int v : g[u]) {
        if (v == p) continue;
        dfs(v, u);
        sz[u] += sz[v];
    }
}
 
int main() {
    cin >> n;
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
 
    dfs(1, 0);
 
    for (int u = 1; u <= n; u++) {
        bool ok = true;
        for (int v : g[u]) {
            if (sz[v] < sz[u] && sz[v] > n/2) ok = false;
        }
        if (n - sz[u] > n/2) ok = false;
        if (ok) {
            cout << u << '\n';
            return 0;
        }
    }
}
```

## Fixed-Length Paths I [problem](https://cses.fi/problemset/task/2080)
```markdown
題目: 

- 給定一棵 n 個節點的樹，以及一個整數 k。
- 請你計算有多少對節點 (u, v)，使得 u 到 v 的簡單路徑長度（邊數）**剛好等於 k**。
- 注意 (u, v) 與 (v, u) 被視為同一對，不重複計算。
```
``` markdown
解法 : 

### 1. 從下往上的 DFS + 後綴合併技巧：
   - 每個節點 dfs 回傳一個 `deque<int>`，第 i 位表示子樹中深度為 i 的節點數量。
   - 計算答案時，從當前節點的所有兒子合併：
     - 枚舉一個子樹 `sb` 中深度 i 的節點數，搭配另一子樹 `sa` 中深度 j，使得 i + j = k。
     - 使用後綴和進行快速計算，確保不重複統計（每對只算一次）。

---

### 2. 為何使用 deque 與後綴：
   - deque 前插 `push_front()` 對應的是：所有深度 +1（進到上一層）
   - 後綴和 `suf[i]` 表示深度 ≥ i 的節點總數，有助於快速計算配對組合數量。
   - 若有多個子樹，會把小的合併到大的以減少複雜度。
```

``` cpp
#include<bits/stdc++.h>
using namespace std;
#define SZ 200005
#define ll long long
 
vector<int> adj[SZ];
int n, k1, k2;
long long ans;
 
int suf(deque<int> &suf, int idx) {
    if(idx<0) return suf[0];
    if(idx>suf.size()-1) return 0;
    return suf[idx];
}
 
/* suf[i] -> sum of nodes having depth in range [i, inf) */
 
void mergeSuffixes(deque<int> &sa, deque<int> &sb) {
    if(sa.size() < sb.size()) swap(sa, sb);
    for(int i=0; i<sb.size(); i++)
        ans += 1LL * (suf(sb,i) - suf(sb, i+1)) * (suf(sa, k1-i) - suf(sa, k2-i+1));
    for(int i=0; i<sb.size(); i++)
        sa[i] += sb[i];
}
 
deque<int> dfs(int u, int p) {
    deque<int> suf_parent{1};
    for(int v: adj[u]) {
        if(v!=p) {
            deque<int> suf_child = dfs(v, u);
            suf_child.push_front(suf_child.front()); // bcoz depth of child[0] should correspond to parent[1]
            mergeSuffixes(suf_parent, suf_child);
        }
    }
    return suf_parent;
}
 
int main () {
    cin.tie(0)->sync_with_stdio(0);
    cin >> n >> k1;
    k2 = k1;
 
	for (int i = 1; i < n; i++) {
		int u, v;
		cin >> u >> v;
		adj[u].push_back(v);
		adj[v].push_back(u);
	}
    dfs(1,-1);
	cout << ans;
    return 0;
}
```

## Fixed-Length Paths II [problem](https://cses.fi/problemset/task/2081)
```markdown
題目: 

- 給定一棵 n 個節點的樹，以及兩個整數 k1, k2。
- 請你計算有多少對節點 (u, v)，使得 u 到 v 的簡單路徑長度滿足：**k1 ≤ 距離 ≤ k2**。
- (u, v) 與 (v, u) 視為同一對，不重複計算。
```
``` markdown
解法 : 

### 1. DFS 回傳子樹節點深度分布：
   - 每個節點 dfs 回傳一個 `deque<int>`，其中第 i 位表示子樹中深度為 i 的節點數。
   - 當處理當前節點 u 時，考慮每個兒子 v 的回傳佇列：
     - 將其中一棵子樹 `sb` 的深度統計與另一棵子樹 `sa` 做配對。
     - 當 i + j ∈ [k1, k2] 時，該對 (u,v) 合法，可以加入答案。

---

### 2. 優化技巧：後綴和與大合小策略
   - 使用 `suf[i]` 表示深度 ≥ i 的節點數，便於快速查詢區間和。
   - 計算配對時：
     - `(suf(sb,i) - suf(sb,i+1))` 取出深度恰為 i 的節點數。
     - `(suf(sa,k1−i) − suf(sa,k2−i+1))` 表示能夠與其配對的另一側深度範圍。
   - 為降低複雜度，合併時總是將小的 deque 合併進大的，類似啟發式合併。
```

``` cpp
#include<bits/stdc++.h>
using namespace std;
#define SZ 200005
#define ll long long
 
vector<int> adj[SZ];
int n, k1, k2;
long long ans;
 
int suf(deque<int> &suf, int idx) {
    if(idx<0) return suf[0];
    if(idx>suf.size()-1) return 0;
    return suf[idx];
}
 
/* suf[i] -> sum of nodes having depth in range [i, inf) */
 
void mergeSuffixes(deque<int> &sa, deque<int> &sb) {
    if(sa.size() < sb.size()) swap(sa, sb);
    for(int i=0; i<sb.size(); i++)
        ans += 1LL * (suf(sb,i) - suf(sb, i+1)) * (suf(sa, k1-i) - suf(sa, k2-i+1));
    for(int i=0; i<sb.size(); i++)
        sa[i] += sb[i];
}
 
deque<int> dfs(int u, int p) {
    deque<int> suf_parent{1};
    for(int v: adj[u]) {
        if(v!=p) {
            deque<int> suf_child = dfs(v, u);
            suf_child.push_front(suf_child.front()); // bcoz depth of child[0] should correspond to parent[1]
            mergeSuffixes(suf_parent, suf_child);
        }
    }
    return suf_parent;
}
 
int main () {
    cin.tie(0)->sync_with_stdio(0);
    cin >> n >> k1 >> k2;
 
	for (int i = 1; i < n; i++) {
		int u, v;
		cin >> u >> v;
		adj[u].push_back(v);
		adj[v].push_back(u);
	}
    dfs(1,-1);
	cout << ans;
    return 0;
}
```
# Range Queries(25 題)
## Static Range Sum Queries [problem](https://cses.fi/problemset/task/1646)
```markdown
題目: 

給定一個長度為 n 的整數陣列，以及 m 組查詢，每次查詢請輸出區間 [a, b] 內所有數字的總和。
```
``` markdown
解法 : 

這是一題經典的前綴和問題，先用 prefix[i] 表示前 i 項的總和，
那麼任意區間 [a, b] 的總和就可以用 prefix[b] - prefix[a-1] 得到。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main(){
    fastio;

    int n, m;
    cin >> n >> m;
    vector<int> prefix(n + 1, 0);

    for(int i = 1; i <= n; ++i){
        int num; cin >> num;
        prefix[i] = num + prefix[i - 1];
    }

    while(m--){
        int a, b;
        cin >> a >> b;
        cout << prefix[b] - prefix[a - 1] << '\n';
    }
    return 0;
}
```

## Static Range Minimum Queries [problem](https://cses.fi/problemset/task/1647)
```markdown
題目: 

- 給定一個長度為 n 的整數陣列。
- 接著有 m 筆查詢，每次查詢給一段區間 [a, b]，請輸出該區間內的最小值。
- 資料不會修改，屬於**靜態 RMQ 問題**。
```
``` markdown
解法 : 

### 1. Segment Tree 預處理
- 對原始陣列建 Segment Tree，記錄每個區間的最小值。
- 查詢時透過 divide-and-conquer 往左右子樹查詢交集區間。

---

### 2. 操作說明
- `build()`：遞迴建樹。
- `query()`：查詢區間最小值。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;

const int MAXN = 2e5 + 5;
int n, q;
int a[MAXN];
int seg[4 * MAXN];

void build(int node, int l, int r) {
    if (l == r) {
        seg[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(2 * node, l, mid);
    build(2 * node + 1, mid + 1, r);
    seg[node] = min(seg[2 * node], seg[2 * node + 1]);
}

int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return INT_MAX;
    if (ql <= l && r <= qr) return seg[node];
    int mid = (l + r) / 2;
    return min(query(2 * node, l, mid, ql, qr),
               query(2 * node + 1, mid + 1, r, ql, qr));
}

int main() {
    fastio;
    cin >> n >> q;
    for (int i = 0; i < n; ++i) cin >> a[i];
    build(1, 0, n - 1);
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << query(1, 0, n - 1, l - 1, r - 1) << '\n';
    }
}
```

## Dynamic Range Sum Queries [problem](https://cses.fi/problemset/task/1648)
```markdown
題目: 

- 有一個長度為 n 的整數陣列。
- 操作共分兩種：
  1. 將第 a 個數字更新為 b。
  2. 查詢某區間 [a, b] 的總和。
- 要處理 m 筆操作，且需在快時間內完成。
```
``` markdown
解法 : 

### 1. Segment Tree + 單點更新
- 因為每次更新只針對單一點（a 變成 b），不需要區間加法或乘法。
- 可以使用 Segment Tree 並進行 **單點賦值操作（point update）**。
- 查詢則為區間加總（range sum）。

---

### 2. 實作說明
- 為了復用 Lazy Segment Tree 的模板，這份程式碼套用了「區間賦值 + 區間加總」的通用寫法。
- 在初始化時，將每個數字作為區間長度為 1 的賦值操作。
- 在更新時，也僅更新單點 (a = b)。
- 雖然 lazy 多此一舉。
```

``` cpp
#include <bits/stdc++.h>
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct LazySegTree {
    int n;
    vector<long long> tree, lazy;
 
    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
    }
 
    void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            tree[node] = (r - l + 1) * lazy[node];
            if (l != r) {
                lazy[2 * node] = lazy[node];
                lazy[2 * node + 1] = lazy[node];
            }
            lazy[node] = 0;
        }
    }
 
    void update(int node, int l, int r, int ul, int ur, long long val) {
        push(node, l, r);
        if (r < ul || ur < l) return;
        if (ul <= l && r <= ur) {
            lazy[node] = val;
            push(node, l, r);
            return;
        }
        int mid = (l + r) / 2;
        update(2 * node, l, mid, ul, ur, val);
        update(2 * node + 1, mid + 1, r, ul, ur, val);
        tree[node] = (tree[2 * node] + tree[2 * node + 1]);
    }
 
    long long query(int node, int l, int r, int ql, int qr) {
        push(node, l, r);
        if (r < ql || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return (query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr));
    }
 
    // wrapper functions
    void add(int l, int r, long long val) {
        update(1, 0, n - 1, l, r, val);
    }
 
    long long range_sum(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    LazySegTree st(n);
    for(int i = 0; i < n; ++i){
        int num; cin >> num;
        st.add(i, i, num);
    }
 
    while(m--){
        int c, a, b;
        cin >> c >> a >> b;
        if(--c) {
            cout << st.range_sum(a - 1, b - 1) << '\n';
        } else {
            st.add(a - 1, a - 1, b);
        }
    }
}
```

## Dynamic Range Minimum Queries [problem](https://cses.fi/problemset/task/1649)
```markdown
題目: 

- 給你一個長度為 n 的整數陣列。
- 有 m 筆操作，操作包含兩種：
  1. 更新第 a 個位置的值為 b。
  2. 查詢區間 [a, b] 的最小值。
- 要求高效地完成所有操作。
```
``` markdown
解法 : 

### 1. Segment Tree + 單點更新
- 使用 Segment Tree 解決區間最小值查詢。
- 此模板用 Lazy Propagation 架構撰寫，但實際操作只有單點更新（區間長度為 1 的賦值）。

---

### 2. 資料結構說明
- `tree[]`: 儲存每個區間的最小值。
- `lazy[]`: 預設為 -1，僅用於懶標記區間賦值。
- `add(l, r, val)`: 更新區間 [l, r] 的值為 val，這題中實際上只會呼叫 `add(i, i, val)`。
- `range_sum(l, r)`: 查詢區間最小值（其實是 `range_min()`，命名只是保留模板習慣）。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct LazySegTree {
    int n;
    vector<long long> tree, lazy;
 
    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, LLONG_MAX);
        lazy.assign(4 * n, -1);
    }
 
    void push(int node, int l, int r) {
        if (lazy[node] != -1) {
            tree[node] = lazy[node];
            if (l != r) {
                lazy[2 * node] = lazy[node];
                lazy[2 * node + 1] = lazy[node];
            }
            lazy[node] = -1;
        }
    }
 
    void update(int node, int l, int r, int ul, int ur, long long val) {
        push(node, l, r);
        if (r < ul || ur < l) return;
        if (ul <= l && r <= ur) {
            lazy[node] = val;
            push(node, l, r);
            return;
        }
        int mid = (l + r) / 2;
        update(2 * node, l, mid, ul, ur, val);
        update(2 * node + 1, mid + 1, r, ul, ur, val);
        tree[node] = min(tree[2 * node] , tree[2 * node + 1]);
    }
 
    long long query(int node, int l, int r, int ql, int qr) {
        push(node, l, r);
        if (r < ql || qr < l) return LLONG_MAX;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return min(query(2 * node, l, mid, ql, qr)
             , query(2 * node + 1, mid + 1, r, ql, qr));
    }
 
    // wrapper functions
    void add(int l, int r, long long val) {
        update(1, 0, n - 1, l, r, val);
    }
 
    long long range_sum(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    LazySegTree st(n);
    for(int i = 0; i < n; ++i){
        int num; cin >> num;
        st.add(i, i, num);
    }
 
    while(m--){
        int c, a, b;
        cin >> c >> a >> b;
        if(--c) {
            cout << st.range_sum(a - 1, b - 1) << '\n';
        } else {
            st.add(a - 1, a - 1, b);
        }
    }
}
```

## Range Xor Queries [problem](https://cses.fi/problemset/task/1650)
```markdown
題目: 

- 給定一個長度為 n 的陣列。
- 有 m 筆查詢，每次查詢一段區間 [a, b] 的 XOR 值。
- 所有查詢為靜態查詢，不包含修改。
```
``` markdown
解法 : 

### 1. 前綴 XOR 陣列（Prefix XOR）
- 定義 prefix[i] 為前 i 項的 XOR 結果，即 prefix[i] = a[1] ^ a[2] ^ ... ^ a[i]
- 區間 [a, b] 的 XOR 結果為：`prefix[b] ^ prefix[a - 1]`
- 原理同前綴和，只是把 `+` 換成了 `^`，且 XOR 符合交換與結合律。

---

### 2. 為何不用 Segment Tree？
- 因為這題資料不會被修改，屬於「純查詢」問題，使用 prefix array 更簡潔且效率更高。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    
    vector<long long> prefix(n + 1, 0);
 
    for(int i = 1; i <= n; ++i){
        int num; cin >> num;
        prefix[i] = prefix[i - 1] ^ num;
    }
 
    while(m--){
        int a, b;
        cin >> a >> b;
        cout << (prefix[b] ^ prefix[a - 1]) << '\n';
    }
}
```

## Range Update Queries [problem](https://cses.fi/problemset/task/1651)
```markdown
題目: 

- 給你一個長度為 n 的整數陣列。
- 有兩種操作，共 m 筆：
  1. 將區間 [a, b] 中的每個數字加上某個值。
  2. 查詢某個位置的當前數值。
- 需要高效處理所有操作。
```
``` markdown
解法 : 

### 1. Lazy Segment Tree（支援區間加法 + 單點查詢）
- 標準 Segment Tree 無法快速處理區間加法 → 改用 Lazy Propagation。
- 區間加法時，用 lazy 陣列標記下推。
- 查詢時從上到下 push 過所有影響當前節點的 lazy。

---

### 2. 核心函數說明：
- `add(l, r, val)`：區間加法操作。
- `range_sum(l, r)`：查詢區間總和，這題中實際只會查詢單點 (l = r)。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct LazySegTree {
    int n;
    vector<long long> tree, lazy;
 
    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
    }
 
    void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            tree[node] += (r - l + 1) * lazy[node];
            if (l != r) {
                lazy[2 * node] += lazy[node];
                lazy[2 * node + 1] += lazy[node];
            }
            lazy[node] = 0;
        }
    }
 
    void update(int node, int l, int r, int ul, int ur, long long val) {
        push(node, l, r);
        if (r < ul || ur < l) return;
        if (ul <= l && r <= ur) {
            lazy[node] = val;
            push(node, l, r);
            return;
        }
        int mid = (l + r) / 2;
        update(2 * node, l, mid, ul, ur, val);
        update(2 * node + 1, mid + 1, r, ul, ur, val);
        tree[node] = (tree[2 * node] + tree[2 * node + 1]);
    }
 
    long long query(int node, int l, int r, int ql, int qr) {
        push(node, l, r);
        if (r < ql || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return (query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr));
    }
 
    // wrapper functions
    void add(int l, int r, long long val) {
        update(1, 0, n - 1, l, r, val);
    }
 
    long long range_sum(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    LazySegTree st(n);
    for(int i = 0; i < n; ++i){
        int num; cin >> num;
        st.add(i, i, num);
    }
 
    while(m--){
        int c;
        cin >> c;
        if(--c){
            int k;
            cin >> k;
            cout << st.range_sum(k-1, k-1) << '\n';
        } else {
            int a, b, num;
            cin >> a >> b >> num;
            st.add(a - 1, b - 1, num);
        }
    }
}
```

## Forest Queries [problem](https://cses.fi/problemset/task/1652)
```markdown
題目: 

- 給定一個 n × n 的地圖，每格是 `*`（代表一棵樹）或 `.`（空地）。
- 接著有 m 筆查詢，每次查詢矩形區域內有幾棵樹。
- 要求能在快速時間內處理所有查詢。
```
``` markdown
解法 : 

### 1. 2D 前綴和（Prefix Sum 2D）
- 建立一個 2D 陣列 `forest[y][x]`，代表從 (1,1) 到 (y,x) 區域內的樹木總數。
- 每格的值可以由以下公式計算：
  forest[i][j] = forest[i-1][j] + forest[i][j-1] - forest[i-1][j-1] + (s[j-1] == '*');
  
- 每次查詢 [y1, x1] 到 [y2, x2] 的總樹數為：
  forest[y2][x2] - forest[y1-1][x2] - forest[y2][x1-1] + forest[y1-1][x1-1]
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    
    vector<vector<long long>> forest(n + 1, vector<long long>(n + 1, 0));
 
    for(int i = 1; i <= n; ++i){
        string s;
        cin >> s;
        for(int j = 1; j <= n; ++j){
            forest[i][j] = forest[i - 1][j] + forest[i][j - 1] -
                forest[i - 1][j - 1] + (s[j - 1] == '*');
        }
    }
 
    while(m--){
        int x1, x2, y1, y2;
        cin >> y1 >> x1 >> y2 >> x2;
        cout << forest[y2][x2] + forest[y1 - 1][x1 - 1] 
            - forest[y2][x1 - 1] - forest[y1 - 1][x2]<< '\n';
    }
}
```

## Hotel Queries [problem](https://cses.fi/problemset/task/1143)
```markdown
題目: 

- 有 n 間旅館，每間可容納的最大人數為 h₁, h₂, ..., hₙ。
- 有 m 組客人，每組人數為 a。
- 對每組客人，找最靠左的旅館且尚有足夠空間接待，並讓他們入住（容量減少）。
- 如果找不到，輸出 0；否則輸出該旅館的編號（從 1 開始）。
```
``` markdown
解法 : 

### 1. Segment Tree + Max + First-Above 查詢
- 每個節點維護區間內最大的剩餘容量。
- 對每組客人，從 root 開始往左右子樹找出 **最靠左且 ≥ a 的節點**。
- 找到後將該點減少 a，並回傳編號。

---

### 2. 實作要點
- 使用 Lazy Segment Tree 模板，雖然這題實際上並無需要 lazy 的區間操作，但沿用 template 可
  快速實作。
- `query()` 採用「左優先遞迴」方式找最靠左的符合條件者。
- 為保留原始值，用 `hotel[]` 陣列記錄旅館目前剩餘容量。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct LazySegTree {
    int n;
    vector<long long> tree, lazy;
 
    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, -1);
    }
 
    void push(int node, int l, int r) {
        if (lazy[node] != -1) {
            tree[node] = lazy[node];
            if (l != r) {
                lazy[2 * node] = lazy[node];
                lazy[2 * node + 1] = lazy[node];
            }
            lazy[node] = -1;
        }
    }
 
    void update(int node, int l, int r, int ul, int ur, long long val) {
        push(node, l, r);
        if (r < ul || ur < l) return;
        if (ul <= l && r <= ur) {
            lazy[node] = val;
            push(node, l, r);
            return;
        }
        int mid = (l + r) / 2;
        update(2 * node, l, mid, ul, ur, val);
        update(2 * node + 1, mid + 1, r, ul, ur, val);
        tree[node] = max(tree[2 * node] , tree[2 * node + 1]);
    }
 
    long long query(int node, int l, int r, int num) {
        push(node, l, r);
        long long mid = (l + r) / 2;
        long long L = LLONG_MAX, R = LLONG_MAX; 
        if(l == r){
            if(tree[node] >= num){
                return mid;
            } else {
                return LLONG_MAX;
            }
        } else if(tree[2 * node] >= num){
            L = query(2 * node, l, mid, num);
        } else if(tree[2 * node + 1] >= num){
            R = query(2 * node + 1, mid + 1, r, num);
        }
        return min(L, R);
    }
 
    // wrapper functions
    void add(int l, int r, long long val) {
        update(1, 0, n - 1, l, r, val);
    }
 
    long long range_query(int num) {
        return query(1, 0, n - 1, num);
    }
};
 
int main(){
    fastio;
    int n, m;
    cin >> n >> m;
    
    vector<int> hotel(n);
    LazySegTree st(n);
 
    for(int i = 0; i < n; ++i){
        int num; cin >> num;
        st.add(i, i, num);
        hotel[i] = num;
    }
 
    while(m--){
        int a;
        cin >> a;
        long long ans = st.range_query(a);
        if(ans != LLONG_MAX){
            st.add(ans, ans, hotel[ans] - a);
            hotel[ans] -= a;
            cout << ans + 1 << ' ';
        } else {
            cout << 0 << ' ';
        }
    }
}
```

## List Removals [problem](https://cses.fi/problemset/task/1749)
```markdown
題目: 

- 給定一個長度為 n 個陣列，每個元素編號為 1 到 n。
- 每次 query 刪掉第 k 個元素，並輸出該元素。
```
``` markdown
解法 : 

### 1. 使用 Segment Tree 解決動態 k-th 人問題
- 我們將所有元素用一個陣列 `element[]` 表示。
- 建立一個 Segment Tree，節點值表示某區間內還活著的元素（即 1 表示該元素還在）。
- 每次要刪除第 k 個元素，可以視為從整體中找第 k 個 1（k-th one），這可以透過 
  Segment Tree 快速達成。
- 找到後將該元素設為 0（標記為已刪除）。

---

### 2. 注意事項
- `range_sum(k)`：在 Segment Tree 中找到前綴和為 k 的最左位置。
- `add(pos, pos, 0)`：將該位置設為 0，代表這個元素已經移除。
- 每回合讀入的 `a` 就是我們要找的第 a 個活元素。
```

``` cpp
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct LazySegTree {
    int n;
    vector<long long> tree, lazy;
 
    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, -1);
    }
 
    void push(int node, int l, int r) {
        if (lazy[node] != -1) {
            tree[node] = (r - l + 1) * lazy[node];
            if (l != r) {
                lazy[2 * node] += lazy[node];
                lazy[2 * node + 1] += lazy[node];
            }
            lazy[node] = -1;
        }
    }
 
    void update(int node, int l, int r, int ul, int ur, long long val) {
        push(node, l, r);
        if (r < ul || ur < l) return;
        if (ul <= l && r <= ur) {
            lazy[node] = val;
            push(node, l, r);
            return;
        }
        int mid = (l + r) / 2;
        update(2 * node, l, mid, ul, ur, val);
        update(2 * node + 1, mid + 1, r, ul, ur, val);
        tree[node] = (tree[2 * node] + tree[2 * node + 1]);
    }
 
    long long query(int node, int l, int r, int num) {
        push(node, l, r);
        long long mid = (l + r) / 2;
        long long L = LLONG_MAX, R = LLONG_MAX; 
        if(l == r){
            if(tree[node] >= num){
                return l;
            } else {
                return LLONG_MAX;
            }
        } else if(tree[2 * node] >= num){
            L = query(2 * node, l, mid, num);
        } else if(tree[2 * node + 1] >= num - tree[2 * node]){
            R = query(2 * node + 1, mid + 1, r, num - tree[2 * node]);
        }
        return min(L, R);
    }
 
    // wrapper functions
    void add(int l, int r, long long val) {
        update(1, 0, n - 1, l, r, val);
    }
 
    long long range_sum(int num) {
        return query(1, 0, n - 1, num);
    }
};
 
int main(){
    fastio;
    int n, m;
    cin >> n;
    
    LazySegTree st(n);
    vector<long long> element(n);
 
    for(int i = 0; i < n; ++i){
        int num; cin >> num;
        st.add(i, i, 1);
        element[i] = num;
    }
    
    while(n--){
        int a;
        cin >> a;
        long long pos = st.range_sum(a);
        cout << element[pos] << ' ';
        st.add(pos, pos, 0);
    }
}
```

## Salary Queries [problem](https://cses.fi/problemset/task/1144)
```markdown
題目: 

- 有 n 位員工，每人有一份薪水。
- 有 q 筆操作，包含：
  - `! a b`: 將第 a 位員工的薪水更新為 b。
  - `? a b`: 詢問薪資範圍在 [a, b] 之間的員工有多少位。
- 每次查詢都需要快速回應。
```
``` markdown
解法 : 

### 1. 離散化 + Binary Indexed Tree（Fenwick Tree）
- 薪資值範圍過大，需先將所有出現過的薪資值進行離散化。
- 使用 BIT 維護薪資值的出現次數。
- 查詢 [a, b] 轉為 prefix sum 差值：`sum(b_idx) - sum(a_idx - 1)`
- 更新員工薪資時，先從舊值位置 -1，再在新值位置 +1。

---

### 2. 離散化細節
- 收集所有出現過的薪資值（初始 + 所有查詢中的 b）。
- 使用 `lower_bound()` 與 `upper_bound()` 找到對應的區間範圍。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 4e5 + 5;
int BIT[MAXN];
 
void add(int idx, int val) {
    while (idx < MAXN) {
        BIT[idx] += val;
        idx += idx & -idx;
    }
}
 
int sum(int idx) {
    int res = 0;
    while (idx > 0) {
        res += BIT[idx];
        idx -= idx & -idx;
    }
    return res;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int n, q;
    cin >> n >> q;
 
    vector<int> p(n + 1);
    vector<pair<char, pair<int, int>>> queries;
    vector<int> all_vals;
 
    for (int i = 1; i <= n; ++i) {
        cin >> p[i];
        all_vals.push_back(p[i]);
    }
 
    for (int i = 0; i < q; ++i) {
        char type;
        int a, b;
        cin >> type >> a >> b;
        queries.emplace_back(type, make_pair(a, b));
        all_vals.push_back(b); // 不管是 ? 還是 ! 都會用到 b
    }
 
    // 離散化
    sort(all_vals.begin(), all_vals.end());
    all_vals.erase(unique(all_vals.begin(), all_vals.end()), all_vals.end());
 
    auto get_index = [&](int x) -> int {
        return lower_bound(all_vals.begin(), all_vals.end(), x) - all_vals.begin() + 1;
    };
 
    vector<int> salary_idx(n + 1);
    for (int i = 1; i <= n; ++i) {
        salary_idx[i] = get_index(p[i]);
        add(salary_idx[i], 1);
    }
 
    for (auto &[type, ab] : queries) {
        int a = ab.first, b = ab.second;
        if (type == '!') {
            add(salary_idx[a], -1);
            salary_idx[a] = get_index(b);
            add(salary_idx[a], 1);
        } else {
            if (a > b) {
                cout << "0\n";
                continue;
            }
            int la = lower_bound(all_vals.begin(), all_vals.end(), a) - all_vals.begin() + 1;
            int rb = upper_bound(all_vals.begin(), all_vals.end(), b) - all_vals.begin();
 
            if (la > rb) cout << "0\n";
            else cout << sum(rb) - sum(la - 1) << '\n';
        }
    }
 
    return 0;
}
```

## Prefix Sum Queries [problem](https://cses.fi/problemset/task/2166)
```markdown
題目: 

- 有一個長度為 n 的整數陣列。
- q 筆操作，包含：
  1. `1 i x`：將第 i 個元素設為 x。
  2. `2 l r`：查詢區間 [l, r] 的最大子陣列和。
- 要求高效完成所有操作。
```
``` markdown
解法 : 

### 1. 使用 Prefix Sum + Segment Tree with Lazy Propagation
這題可以只用標準 Segment Tree，但我們沿用更通用的做法：
- 計算 prefix sum 陣列 `prefix[i] = a[1] + ... + a[i]`
- 利用 segment tree 維護區間的 prefix 最大值
- 更新第 i 項時，相當於將第 i~n 區間都進行加法 → 用 **lazy propagation 做 range add**
- 查詢區間最大子段和 `a[l..r]`，即為 `max(prefix[r]) - prefix[l-1]`

---

### 2. 節點資訊
每個節點維護：
- 區間最大值 `max_val`
- 懶標記 `lazy`：表示尚未傳遞的區間加總

查詢時需加上懶標記進行正確比對。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

struct Node {
    ll sum, prefix, suffix, res;
};

int n, q;
vector<Node> tree;
vector<ll> a;

Node merge(Node l, Node r) {
    Node res;
    res.sum = l.sum + r.sum;
    res.prefix = max(l.prefix, l.sum + r.prefix);
    res.suffix = max(r.suffix, r.sum + l.suffix);
    res.res = max({l.res, r.res, l.suffix + r.prefix});
    return res;
}

void build(int node, int l, int r) {
    if (l == r) {
        ll val = a[l];
        tree[node] = {val, max(0LL, val), max(0LL, val), max(0LL, val)};
        return;
    }
    int mid = (l + r) / 2;
    build(2 * node, l, mid);
    build(2 * node + 1, mid + 1, r);
    tree[node] = merge(tree[2 * node], tree[2 * node + 1]);
}

void update(int node, int l, int r, int idx, ll val) {
    if (l == r) {
        tree[node] = {val, max(0LL, val), max(0LL, val), max(0LL, val)};
        return;
    }
    int mid = (l + r) / 2;
    if (idx <= mid) update(2 * node, l, mid, idx, val);
    else update(2 * node + 1, mid + 1, r, idx, val);
    tree[node] = merge(tree[2 * node], tree[2 * node + 1]);
}

Node query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return {0, 0, 0, 0};  // neutral element
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return merge(
        query(2 * node, l, mid, ql, qr),
        query(2 * node + 1, mid + 1, r, ql, qr)
    );
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> n >> q;
    a.resize(n + 1);
    tree.resize(4 * (n + 1));

    for (int i = 1; i <= n; ++i) cin >> a[i];
    build(1, 1, n);

    while (q--) {
        int type, x, y;
        cin >> type >> x >> y;
        if (type == 1) {
            update(1, 1, n, x, y);
        } else {
            cout << query(1, 1, n, x, y).res << '\n';
        }
    }
}
```

## Pizzeria Queries [problem](https://cses.fi/problemset/task/2206)
```markdown
題目: 

- 有 n 個披薩店，每家店的位置為其在陣列中的編號（0-based）。
- 每家店的披薩價格為 p[i]，但實際價格會因顧客與披薩店的距離產生變化。
- 顧客與披薩店的距離為 |i - k|，所以顧客要付的價格為 p[i] + |i - k|。
- 有兩種操作：
  - `1 k x`：把第 k 家披薩店價格更新為 x
  - `2 k`：查詢顧客在第 k 個位置要花的最小費用。
```
``` markdown
解法 : 

### 1. 把絕對值變成兩個區段討論：
   - 目標是最小化 p[i] + |i - k|。
   - 當 i <= k 時：p[i] + (k - i) = (p[i] - i) + k
   - 當 i >= k 時：p[i] + (i - k) = (p[i] + i) - k
   - 所以可以將原本的 p[i] 轉換成兩個陣列：
     - left[i] = p[i] - i，對應於 i ≤ k
     - right[i] = p[i] + i，對應於 i ≥ k

---

### 2. 建兩棵 Segment Tree：
   - `segL` 用來維護 left[i]，查詢範圍為 [0, k]
   - `segR` 用來維護 right[i]，查詢範圍為 [k, n-1]
   - 每次查詢答案為：
     - `min( segL.query(0, k) + k, segR.query(k, n-1) - k )`

---

### 3. 更新操作：
   - 每次把第 k 家店的價錢改為 x，需要更新：
     - left[k] = x - k
     - right[k] = x + k
   - 分別更新 `segL` 和 `segR`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define int long long
const int INF = 1e18;
 
struct SegmentTree {
    int n;
    vector<int> tree;
 
    SegmentTree(int sz) {
        n = sz;
        tree.assign(4*n, INF);
    }
 
    void build(int idx, int l, int r, const vector<int>& arr) {
        if (l == r) {
            tree[idx] = arr[l];
            return;
        }
        int mid = (l+r)/2;
        build(2*idx, l, mid, arr);
        build(2*idx+1, mid+1, r, arr);
        tree[idx] = min(tree[2*idx], tree[2*idx+1]);
    }
 
    void update(int idx, int l, int r, int pos, int val) {
        if (l == r) {
            tree[idx] = val;
            return;
        }
        int mid = (l+r)/2;
        if (pos <= mid) update(2*idx, l, mid, pos, val);
        else update(2*idx+1, mid+1, r, pos, val);
        tree[idx] = min(tree[2*idx], tree[2*idx+1]);
    }
 
    int query(int idx, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return INF;
        if (ql <= l && r <= qr) return tree[idx];
        int mid = (l+r)/2;
        return min(query(2*idx, l, mid, ql, qr), query(2*idx+1, mid+1, r, ql, qr));
    }
};
 
inline void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);
}
 
int32_t main() {
    fastio();
    int n, q;
    cin >> n >> q;
    vector<int> p(n);
    for (int i = 0; i < n; ++i) cin >> p[i];
 
    vector<int> left(n), right(n);
    for (int i = 0; i < n; ++i) {
        left[i] = p[i] - i;
        right[i] = p[i] + i;
    }
 
    SegmentTree segL(n), segR(n);
    segL.build(1, 0, n-1, left);
    segR.build(1, 0, n-1, right);
 
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int k, x; cin >> k >> x; --k;
            segL.update(1, 0, n-1, k, x-k);
            segR.update(1, 0, n-1, k, x+k);
        } else {
            int k; cin >> k; --k;
            int res = INF;
            res = min(res, segL.query(1, 0, n-1, 0, k) + k);
            res = min(res, segR.query(1, 0, n-1, k, n-1) - k);
            cout << res << '\n';
        }
    }
 
    return 0;
}
```

## Visible Buildings Queries [problem](https://cses.fi/problemset/task/3304)
```markdown
題目: 

- 給定一列建築物的高度 h[1..n]。
- 一個建築物可以「看到」右邊第一個比自己高的建築。
- 給 q 組查詢，每次問從第 a 棟出發，往右最多看到幾棟建築（包括自己），且不能超過第 b 棟。
```
``` markdown
解法 : 

### 1. 預處理每棟樓能看到的下一棟：
   - 用 stack 從右往左掃，維護「右邊第一個比自己高」的建築編號。
   - 記錄為 `nxt[i]`，代表從 i 能跳到哪一棟。

---

### 2. Binary Lifting 加速跳躍：
   - 建立 jump table：jump[k][i] 表示從 i 出發，跳 2^k 次會到哪棟。
   - 初始 jump[0][i] = nxt[i]
   - 遞推 jump[k][i] = jump[k-1][jump[k-1][i]]
   - 預處理時間 O(n log n)

---

### 3. 查詢：
   - 對於每次查詢 (a, b)，從 a 開始跳。
   - 若 jump[k][curr] ≤ b 就可以跳，並累加 (1 << k) 到答案。
   - 每次查詢最多跳 log n 次，時間 O(log n)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 2e5 + 5;
const int LOG = 20;
 
int n, q;
int h[MAXN]; // height of buildings, 1-based
int nxt[MAXN]; // nxt[i] = next visible building from i
int jump[LOG][MAXN]; // jump[k][i] = from i, jump 2^k steps
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; ++i) cin >> h[i];
 
    // Step 1: 建 next[]（右邊第一個比它高的建築）
    stack<int> s;
    for (int i = n; i >= 1; --i) {
        while (!s.empty() && h[s.top()] <= h[i]) s.pop();
        if (!s.empty()) nxt[i] = s.top();
        else nxt[i] = n + 1; // 超出界限
        s.push(i);
    }
 
    // Step 2: 建 jump table (binary lifting)
    for (int i = 1; i <= n + 1; ++i)
        jump[0][i] = nxt[i];
    jump[0][n + 1] = n + 1; // 防止越界亂跳
 
    for (int k = 1; k < LOG; ++k)
        for (int i = 1; i <= n + 1; ++i)
            jump[k][i] = jump[k - 1][jump[k - 1][i]];
 
    // Step 3: 處理每個 query
    while (q--) {
        int a, b;
        cin >> a >> b;
        int ans = 1; // 至少看到 a 自己
        int curr = a;
        for (int k = LOG - 1; k >= 0; --k) {
            if (jump[k][curr] <= b) {
                curr = jump[k][curr];
                ans += (1 << k);
            }
        }
        cout << ans << '\n';
    }
}
```

## Range Interval Queries [problem](https://cses.fi/problemset/task/3163)
```markdown
題目: 

- 給定一個長度為 n 的整數陣列 x[1..n]。
- 有 m 個查詢，每次給定範圍 [a, b] 和數值範圍 [c, d]。
- 問在區間 x[a..b] 中，有多少元素的值落在 [c, d] 區間中。
```
``` markdown
解法 : 

### 1. Wavelet Tree：
   - 這類屬於「區間值域查詢」，適合使用 Wavelet Tree。
   - 時間複雜度為 O(log V)，V 為值域大小。
   - 這裡使用座標壓縮將值域壓縮到 0 ~ n-1，避免實際建到 1e9 的空間。

---

### 2. 實作細節：
   - `raw`：將輸入陣列排序後去重，作為值域基準。
   - `encode(val)`：將原始值映射到座標壓縮後的編號。
   - 查詢時將 [c, d] 映射到編號區間 [l, r]。
   - Wavelet Tree 支援查詢區間 [a, b] 內小於等於 k 的數量。
   - 所以答案為 `LTE(a, b, r) - LTE(a, b, l - 1)`。
```

``` cpp
#pragma GCC optimize("Ofast,unroll-loops,no-stack-protector")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#include <bits/stdc++.h>
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
struct WaveletTree {
    int lo, hi;
    WaveletTree *l, *r;
    vector<int> b;
 
    WaveletTree(vector<int>::iterator from, vector<int>::iterator to, int x, int y) {
        lo = x, hi = y;
        if (from >= to || lo > hi) return;
 
        if (lo == hi) {
            b.resize(to - from + 1);
            iota(b.begin(), b.end(), 0);
            return;
        }
 
        int mid = (lo + hi) / 2;
        vector<int> left, right;
        b.reserve(to - from + 1);
        b.push_back(0);
        for (auto it = from; it != to; ++it) {
            if (*it <= mid) {
                left.push_back(*it);
                b.push_back(b.back() + 1);
            } else {
                right.push_back(*it);
                b.push_back(b.back());
            }
        }
        l = new WaveletTree(left.begin(), left.end(), lo, mid);
        r = new WaveletTree(right.begin(), right.end(), mid + 1, hi);
    }
 
    int LTE(int lq, int rq, int k) {
        if (lq > rq || k < lo) return 0;
        if (hi <= k) return rq - lq + 1;
        return l->LTE(b[lq - 1] + 1, b[rq], k) +
               r->LTE(lq - b[lq - 1], rq - b[rq], k);
    }
};
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<int> x(n), c(m), d(m);
    for (int i = 0; i < n; ++i)
        cin >> x[i];
 
    vector<tuple<int, int, int, int>> queries(m);
    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b >> c[i] >> d[i];
        queries[i] = {a, b, c[i], d[i]};
    }
 
    vector<int> raw(x.begin(), x.end());
    sort(raw.begin(), raw.end());
    raw.erase(unique(raw.begin(), raw.end()), raw.end());
 
    auto encode = [&](int val) {
        return lower_bound(raw.begin(), raw.end(), val) - raw.begin();
    };
 
    vector<int> compressed(n);
    for (int i = 0; i < n; ++i)
        compressed[i] = encode(x[i]);
 
    WaveletTree wt(compressed.begin(), compressed.end(), 0, raw.size() - 1);
 
    for (int i = 0; i < m; ++i) {
        auto [a, b, cc, dd] = queries[i];
        int l = lower_bound(raw.begin(), raw.end(), cc) - raw.begin();
        int r = upper_bound(raw.begin(), raw.end(), dd) - raw.begin() - 1;
 
        if (l >= (int)raw.size() || r < 0 || l > r) {
            cout << 0 << '\n';
            continue;
        }
        l = max(l, 0);
        r = min(r, (int)raw.size() - 1);
        cout << wt.LTE(a, b, r) - wt.LTE(a, b, l - 1) << '\n';
    }
}
```

## Subarray Sum Queries [problem](https://cses.fi/problemset/task/1190)
```markdown
題目: 

- 給定一個長度為 n 的整數陣列。
- 有 m 筆操作：
  1. `1 k x`：將第 k 個數字改為 x。
  2. `2 a b`：查詢區間 [a, b] 中的最大子段和（可以是空子段，最小為 0）。
- 陣列可能包含負數，需快速更新與查詢。
```
``` markdown
解法 : 

### 1. Segment Tree 維護最大子段和（Maximum Subarray Sum）
每個節點維護四個資訊：
- `sum`：整個區間的總和
- `prefix`：區間最大前綴和
- `suffix`：區間最大後綴和
- `best`：區間內最大子段和

這些資訊可在合併左右子樹時維護：
- res.sum    = L.sum + R.sum;
- res.prefix = max(L.prefix, L.sum + R.prefix);
- res.suffix = max(R.suffix, R.sum + L.suffix);
- res.best   = max({L.best, R.best, L.suffix + R.prefix});

---

### 2. 查詢邏輯
- 使用線段樹查詢區間 [l, r] 對應的節點合併結果。
- 若區間內元素皆為負數，返回 0 即為空子段和。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    long long sum, prefix, suffix, best;
    Node(long long val = 0) {
        sum = prefix = suffix = best = val;
    }
};

const int MAXN = 2e5 + 5;
Node tree[4 * MAXN];
int arr[MAXN];

Node merge(const Node &left, const Node &right) {
    Node res;
    res.sum = left.sum + right.sum;
    res.prefix = max(left.prefix, left.sum + right.prefix);
    res.suffix = max(right.suffix, right.sum + left.suffix);
    res.best = max({left.best, right.best, left.suffix + right.prefix});
    return res;
}

void build(int l, int r, int idx) {
    if (l == r) {
        tree[idx] = Node(arr[l]);
        return;
    }
    int mid = (l + r) / 2;
    build(l, mid, idx * 2);
    build(mid + 1, r, idx * 2 + 1);
    tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
}

void update(int pos, int val, int l, int r, int idx) {
    if (l == r) {
        tree[idx] = Node(val);
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) update(pos, val, l, mid, idx * 2);
    else update(pos, val, mid + 1, r, idx * 2 + 1);
    tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
}

Node query(int ql, int qr, int l, int r, int idx) {
    if (qr < l || r < ql) return Node(0); // neutral for sum, best=0
    if (ql <= l && r <= qr) return tree[idx];
    int mid = (l + r) / 2;
    Node left = query(ql, qr, l, mid, idx * 2);
    Node right = query(ql, qr, mid + 1, r, idx * 2 + 1);
    return merge(left, right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) cin >> arr[i];
    build(1, n, 1);

    while (m--) {
        int type, a, b;
        cin >> type >> a >> b;
        if (type == 1) {
            update(a, b, 1, n, 1);
        } else {
            cout << max(0LL, query(a, b, 1, n, 1).best) << '\n';
        }
    }

    return 0;
}
```

## Subarray Sum Queries II [problem](https://cses.fi/problemset/task/3226)
```markdown
題目: 

- 給定長度為 n 的整數陣列 a[1..n]。
- 有 m 次查詢，每次輸入區間 [a, b]，輸出該區間的最大子陣列和（最大連續子區間和）。
- 若區間內所有數都為負數，則輸出 0。
```
``` markdown
解法 : 

### 1. 使用 Segment Tree 儲存區間資訊：
   - 每個節點維護四個值：
     - `sum`: 區間總和
     - `prefix`: 從左邊開始的最大前綴和
     - `suffix`: 從右邊開始的最大後綴和
     - `best`: 該區間的最大子陣列和

---

### 2. 合併邏輯（Merge）：
   - `sum = L.sum + R.sum`
   - `prefix = max(L.prefix, L.sum + R.prefix)`
   - `suffix = max(R.suffix, R.sum + L.suffix)`
   - `best = max(L.best, R.best, L.suffix + R.prefix)`
   - 類似於線段樹版本的 Kadane's Algorithm
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
struct Node {
    long long sum, prefix, suffix, best;
    Node(long long val = 0) {
        sum = prefix = suffix = best = val;
    }
};
 
const int MAXN = 2e5 + 5;
Node tree[4 * MAXN];
int arr[MAXN];
 
Node merge(const Node &left, const Node &right) {
    Node res;
    res.sum = left.sum + right.sum;
    res.prefix = max(left.prefix, left.sum + right.prefix);
    res.suffix = max(right.suffix, right.sum + left.suffix);
    res.best = max({left.best, right.best, left.suffix + right.prefix});
    return res;
}
 
void build(int l, int r, int idx) {
    if (l == r) {
        tree[idx] = Node(arr[l]);
        return;
    }
    int mid = (l + r) / 2;
    build(l, mid, idx * 2);
    build(mid + 1, r, idx * 2 + 1);
    tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
}
 
void update(int pos, int val, int l, int r, int idx) {
    if (l == r) {
        tree[idx] = Node(val);
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) update(pos, val, l, mid, idx * 2);
    else update(pos, val, mid + 1, r, idx * 2 + 1);
    tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
}
 
Node query(int node, int l, int r, int ql, int qr) {
    if (r < ql || qr < l) return 0;
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return merge(query(2 * node, l, mid, ql, qr)
            , query(2 * node + 1, mid + 1, r, ql, qr));
}
 
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) cin >> arr[i];
    build(1, n, 1);
 
    while (m--) {
        int a, b;
        cin >> a >> b;
        cout << max(0LL, query(1, 1, n, a, b).best) << '\n'; // 最大子陣列和（若全負則輸出 0）
    }
 
    return 0;
}
```

## Distinct Values Queries [problem](https://cses.fi/problemset/task/1734)
```markdown
題目: 

- 給定一個長度為 n 的整數陣列 a[1..n]。
- 有 q 組查詢，每次給定區間 [l, r]，問該區間中有多少個「不同」的數值（distinct elements）。
```
``` markdown
解法 : 


### 1. Mo's Algorithm（離線區間查詢技巧）：
   - 適合處理所有查詢都已知，並且查詢不需要修改值的情況。
   - 將所有查詢依據 block 編號與右端點排序，可保證單次移動成本 amortized 為 O(√n)。
   - 每筆查詢以滑動窗口的方式維護當前區間 [curr_l, curr_r] 的答案。
   - 本題的答案是當前區間中有多少個不同的元素（可以用 `frequency[x] == 1` 來判斷）。

---

### 2. 離散化（Coordinate Compression）：
   - 由於 a[i] 數值可能過大（最多 1e9），須先離散化。
   - 排序 + 去重後將所有值映射為 1 ~ n 範圍內的編號，方便開 frequency 陣列。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5;
 
int n, q, block_size;
int A[N], ans[N];
struct Query {
    int l, r, idx;
    bool operator<(const Query& other) const {
        if (l / block_size != other.l / block_size)
            return l / block_size < other.l / block_size;
        return r < other.r; 
    }
};
 
vector<Query> queries;
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n >> q;
    block_size = sqrt(n);
 
    vector<int> raw(n+1);
    for (int i = 1; i <= n; ++i) cin >> raw[i];
 
    // 離散化
    vector<int> tmp = raw;
    sort(tmp.begin() + 1, tmp.end());
    tmp.erase(unique(tmp.begin() + 1, tmp.end()), tmp.end());
    for (int i = 1; i <= n; ++i) {
        A[i] = lower_bound(tmp.begin() + 1, tmp.end(), raw[i]) - tmp.begin();
    }
 
    for (int i = 0; i < q; ++i) {
        int l, r; cin >> l >> r;
        queries.push_back({l, r, i});
    }
 
    sort(queries.begin(), queries.end());
 
    vector<int> freq(n+2, 0); // 離散化後最多 n
    int distinct = 0;
 
    auto add = [&](int pos) {
        if (++freq[A[pos]] == 1) distinct++;
    };
    auto remove = [&](int pos) {
        if (--freq[A[pos]] == 0) distinct--;
    };
 
    int curr_l = 1, curr_r = 0;
    for (auto& query : queries) {
        int l = query.l, r = query.r;
 
        while (curr_l > l) add(--curr_l);
        while (curr_r < r) add(++curr_r);
        while (curr_l < l) remove(curr_l++);
        while (curr_r > r) remove(curr_r--);
 
        ans[query.idx] = distinct;
    }
 
    for (int i = 0; i < q; ++i) {
        cout << ans[i] << "\n";
    }
 
    return 0;
}
```

## Distinct Values Queries II [problem](https://cses.fi/problemset/task/3356)
```markdown
題目: 

- 給定長度為 n 的陣列 A[1..n]，初始為整數。
- 有兩種操作：
  - `1 pos val`：把第 pos 個位置更新為 val。
  - `2 l r`：詢問區間 A[l..r] 是否所有值皆互不相同（distinct）？
- 回答 YES 或 NO。
```
``` markdown
解法 : 

### 1. 觀察目標：
   - 如果區間 [l, r] 中有兩個位置值相同，則這區間「不是全 distinct」。
   - 問題轉化為：是否存在某個 i ∈ [l, r] 使得「i 的下一個出現位置」在 [l, r] 內？

---

### 2. 使用 S[i] 表示下一次出現的位置：
   - 若 i 是某值的前一次出現，則 S[i] 記錄下一次出現的位置。
   - 若某個 S[i] ∈ [l, r]，則區間內存在重複 → 輸出 NO。
   - 否則輸出 YES。

---

### 3. Segment Tree 維護最小 S[i]：
   - 建一棵 Segment Tree，維護每個位置的 S[i]。
   - 對於每次查詢 (l, r)，查詢區間最小值 minS = min{S[l..r]}。
   - 若 minS ≤ r，代表區間內有重複元素。

---

### 4. 動態更新：
   - 使用 `map<int, set<int>>` 記錄每個值的位置集合。
   - 每次值更新，調整相鄰出現位置的 S[] 並用 Segment Tree 更新。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int INF = 1e9+10;
 
struct SegmentTree {
    int n;
    vector<int> tree;
 
    SegmentTree(int sz) {
        n = sz;
        tree.assign(4*n, INF);
    }
 
    void build(int idx, int l, int r, const vector<int>& S) {
        if (l == r) {
            tree[idx] = S[l];
            return;
        }
        int mid = (l+r)/2;
        build(2*idx, l, mid, S);
        build(2*idx+1, mid+1, r, S);
        tree[idx] = min(tree[2*idx], tree[2*idx+1]);
    }
 
    void update(int idx, int l, int r, int pos, int val) {
        if (l == r) {
            tree[idx] = val;
            return;
        }
        int mid = (l+r)/2;
        if (pos <= mid) update(2*idx, l, mid, pos, val);
        else update(2*idx+1, mid+1, r, pos, val);
        tree[idx] = min(tree[2*idx], tree[2*idx+1]);
    }
 
    int query(int idx, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return INF;
        if (ql <= l && r <= qr) return tree[idx];
        int mid = (l+r)/2;
        return min(query(2*idx, l, mid, ql, qr), query(2*idx+1, mid+1, r, ql, qr));
    }
};
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    int n, q;
    cin >> n >> q;
    vector<int> A(n+1);
    for (int i = 1; i <= n; ++i) cin >> A[i];
 
    vector<int> S(n+1, INF);
    map<int, set<int>> pos_map;
 
    for (int i = 1; i <= n; ++i) {
        auto& s = pos_map[A[i]];
        if (!s.empty()) {
            int prv = *prev(s.end());
            S[prv] = i;
        }
        s.insert(i);
    }
 
    SegmentTree seg(n+1);
    seg.build(1,1,n,S);
 
    while (q--) {
        int type;
        cin >> type;
        if (type == 2) {
            int l, r;
            cin >> l >> r;
            int minS = seg.query(1,1,n,l,r);
            cout << (minS <= r ? "NO\n" : "YES\n");
        } else {
            int pos, val;
            cin >> pos >> val;
            if (A[pos] == val) continue;
 
            // 刪除舊值鏈上的 pos
            {
                auto& s = pos_map[A[pos]];
                auto it = s.find(pos);
                int prv = -1, nxt = -1;
 
                if (it != s.begin()) prv = *prev(it);
                if (next(it) != s.end()) nxt = *next(it);
 
                if (prv != -1) {
                    S[prv] = nxt == -1 ? INF : nxt;
                    seg.update(1,1,n,prv,S[prv]);
                }
                if (nxt != -1) {
                    // 不需要處理 S[nxt] 因為它已經指向它之後的
                }
 
                S[pos] = INF;
                seg.update(1,1,n,pos,INF);
                s.erase(it);
            }
 
            A[pos] = val;
 
            // 插入新值鏈上的 pos
            {
                auto& s = pos_map[val];
                s.insert(pos);
                auto it = s.find(pos);
                int prv = -1, nxt = -1;
 
                if (it != s.begin()) prv = *prev(it);
                if (next(it) != s.end()) nxt = *next(it);
 
                if (prv != -1) {
                    S[prv] = pos;
                    seg.update(1,1,n,prv,S[prv]);
                }
 
                if (nxt != -1) {
                    S[pos] = nxt;
                } else {
                    S[pos] = INF;
                }
                seg.update(1,1,n,pos,S[pos]);
            }
        }
    }
    return 0;
}
```

## Increasing Array Queries [problem](https://cses.fi/problemset/task/2416)
```markdown
題目: 

- 給定一個長度為 n 的陣列 a[1..n]。
- 定義你可以執行以下操作任意次：
  - 選定一個區間 [l..r]，把 a[l..r] 區間內的所有值設為同一個值 v（只要這樣做不會讓陣列不遞增）。
- 現在有 q 個查詢，每個查詢給你一個區間 [l, r]，問若從原始 a[] 依序進行操作直到整個陣列遞增後，
  a[l..r] 的總和會是多少。
```
``` markdown
解法 : 

### 1. 模擬「變成遞增陣列」的過程：
   - 要讓陣列遞增，當 a[i] < a[i-1] 時，就需要把 a[i] 提高到 a[i-1]。
   - 所以我們可以倒著從右往左處理，維持一個「單調不遞減」的序列。
   - 對每個位置 l，我們會把區間 [l, r] 設為 a[l]，其中 r 是第一個滿足 a[r] ≥ a[l] 的位置。

---

### 2. Segment Tree 維護目前陣列：
   - 使用一棵 Lazy Segment Tree：
     - 支援區間 assign：將一段區間全部設為某個值。
     - 支援區間最大值查詢 mx[]
     - 支援區間總和查詢 sm[]
   - 還需要一個 `orderOf()` 函數，找出從某個位置 l 開始，第一個比 a[l] 小的位置，作為 assign 
     的右邊界。

---

### 3. 處理查詢：
   - 使用前綴和 a[i] → 原始總和為 a[r] - a[l-1]
   - 更新後總和使用 Segment Tree 查詢 sum(l, r)
   - 所以答案為：
     - `sum(l, r) - (a[r] - a[l-1])`，表示總共補上去的值（花費）
```

``` cpp
#include <bits/stdc++.h>
 
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
const int maxN = 2e5+1;
const int SIZE = 4*maxN;
 
int N, Q, lo[SIZE], hi[SIZE];
ll a[maxN], ass[SIZE], mx[SIZE], sm[SIZE], ans[maxN];
vector<pii> queries[maxN];
 
int len(int i){
    return hi[i]-lo[i]+1;
}
 
void assign(int i, ll val){
    ass[i] = mx[i] = val;
    sm[i] = val * len(i);
}
 
void push(int i){
    if(ass[i]){
        assign(2*i, ass[i]);
        assign(2*i+1, ass[i]);
        ass[i] = 0;
    }
}
 
void pull(int i){
    sm[i] = sm[2*i] + sm[2*i+1];
    mx[i] = max(mx[2*i], mx[2*i+1]);
}
 
void init(int i, int l, int r){
    lo[i] = l; hi[i] = r;
    if(l == r){
        sm[i] = a[l];
        return;
    }
    int m = (l+r)/2;
    init(2*i, l, m);
    init(2*i+1, m+1, r);
    pull(i);
}
 
void update(int i, int l, int r, ll val){
    if(l > hi[i] || r < lo[i])  return;
    if(l <= lo[i] && hi[i] <= r){
        assign(i, val);
        return;
    }
 
    push(i);
    update(2*i, l, r, val);
    update(2*i+1, l, r, val);
    pull(i);
}
 
int orderOf(int i, int l, int val){
    if(lo[i] == hi[i])                  return lo[i];
    push(i);
    int idx = -1;
    if(hi[2*i] <= l || mx[2*i] < val)   idx = orderOf(2*i+1, l, val);
    else                                idx = orderOf(2*i, l, val);
    pull(i);
    return idx;
}
 
ll sum(int i, int l, int r){
    if(l > hi[i] || r < lo[i])      return 0;
    if(l <= lo[i] && hi[i] <= r)    return sm[i];
 
    push(i);
    ll left = sum(2*i, l, r);
    ll right = sum(2*i+1, l, r);
    pull(i);
 
    return left+right;
}
 
int main(){
    scanf("%d %d", &N, &Q);
    for(int i = 1; i <= N; i++)
        scanf("%lld", &a[i]);
 
    init(1, 1, N);
    for(int q = 0, l, r; q < Q; q++){
        scanf("%d %d", &l, &r);
        queries[l].push_back({r, q});
    }
 
    for(int i = 2; i <= N; i++) a[i] += a[i-1];
    for(int l = N; l >= 1; l--){
        int val = a[l]-a[l-1];
        int modifyR = (mx[1] < val ? N+1 : orderOf(1, l, val));
        update(1, l, modifyR-1, val);
        for(pii q : queries[l]){
            int r = q.first;
            int id = q.second;
            ans[id] = sum(1, l, r) - (a[r]-a[l-1]);
        }
    }
 
    for(int i = 0; i < Q; i++)
        printf("%lld\n", ans[i]);
}
```

## Movie Festival Queries

## Forest Queries II [problem](https://cses.fi/problemset/task/1739)
```markdown
題目: 

- 給定一個 n × n 的地圖（1 ≤ n ≤ 1000），由 '.' 和 '*' 組成，代表空地和樹。
- 有 q 次操作，每次為下列兩種之一：
  - `1 y x`：將格子 (y,x) 的內容在 '.' 與 '*' 間切換。
  - `2 y1 x1 y2 x2`：詢問矩形區域內總共有幾棵樹（即 '*' 的個數）。
```
``` markdown
解法 : 

### 1. 使用 2D BIT（Binary Indexed Tree）：
   - 因為有大量查詢與修改，使用 2D Fenwick Tree 來維護每個位置是否有樹。
   - 每次修改對應位置的值 +1 或 -1。
   - 查詢某個矩形區域樹木總數，可以用 2D 前綴和計算：

     ```
     query(y1,x1,y2,x2) = sum(y2,x2) 
                        - sum(y1-1,x2) 
                        - sum(y2,x1-1) 
                        + sum(y1-1,x1-1)
     ```

---

### 2. 初始化：
   - 將初始地圖上所有 '*' 的位置，在 BIT 中加 1。

---

### 3. 更新操作：
   - 若原本為 '*'，則變為 '.' 並從 BIT 扣除 1。
   - 反之則變為 '*' 並在 BIT 加上 1。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 1005;
 
int n, q;
int BIT[N][N];
char grid[N][N];
 
// 單點修改 BIT
void add(int x, int y, int delta) {
    for (int i = x; i <= n; i += i & -i) {
        for (int j = y; j <= n; j += j & -j) {
            BIT[i][j] += delta;
        }
    }
}
 
// 查詢 (1,1) ~ (x,y) 的總和
int sum(int x, int y) {
    int res = 0;
    for (int i = x; i > 0; i -= i & -i) {
        for (int j = y; j > 0; j -= j & -j) {
            res += BIT[i][j];
        }
    }
    return res;
}
 
// 查詢任意矩形 (y1,x1) ~ (y2,x2)
int query(int y1, int x1, int y2, int x2) {
    return sum(y2, x2) - sum(y1 - 1, x2) - sum(y2, x1 - 1) + sum(y1 - 1, x1 - 1);
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; ++i) {
        string s;
        cin >> s;
        for (int j = 1; j <= n; ++j) {
            grid[i][j] = s[j-1];
            if (grid[i][j] == '*') add(i, j, 1);
        }
    }
 
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int y, x;
            cin >> y >> x;
            if (grid[y][x] == '*') {
                grid[y][x] = '.';
                add(y, x, -1);
            } else {
                grid[y][x] = '*';
                add(y, x, 1);
            }
        } else {
            int y1, x1, y2, x2;
            cin >> y1 >> x1 >> y2 >> x2;
            cout << query(y1, x1, y2, x2) << "\n";
        }
    }
}
```

## Range Updates and Sums [problem](https://cses.fi/problemset/task/1735)
```markdown
題目: 

- 給定長度為 n 的整數陣列 a[1..n]，有 q 次操作，每次為以下三種之一：
  - `1 a b x`：將區間 [a, b] 中的每個元素都加上 x。
  - `2 a b x`：將區間 [a, b] 中的每個元素都設為 x。
  - `3 a b`：詢問區間 [a, b] 的總和。
```
``` markdown
解法 : 

### 1. 使用 Lazy Segment Tree 同時支援加法與指派：
   - 每個節點紀錄：
     - `sum`：該區間總和
     - `add`：延遲加法操作（區間加法用）
     - `set` + `to_set`：延遲指派操作（區間設值用）

---

### 2. 推進與合併邏輯：
   - `push()`：
     - 若該區間被標記為 set，則直接覆蓋子節點並清除加法。
     - 若有 add，則將加法往子節點下推。
   - `range_add()`：
     - 若完全覆蓋，直接加上值並打上 add 標記。
   - `range_set()`：
     - 若完全覆蓋，直接設為該值並打上 set 標記，清除 add。
   - `query()`：
     - 查詢區間和時，需先 push 確保所有延遲標記被處理。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define ll long long
const int N = 2e5+5;
 
struct Node {
    ll sum, add, set;
    bool to_set;
} seg[N<<2];
 
ll a[N];
int n, q;
 
void build(int id, int l, int r) {
    if (l == r) {
        seg[id].sum = a[l];
        return;
    }
    int mid = (l+r)/2;
    build(id*2,l,mid);
    build(id*2+1,mid+1,r);
    seg[id].sum = seg[id*2].sum + seg[id*2+1].sum;
}
 
void push(int id, int l, int r) {
    int mid = (l+r)/2;
    if (seg[id].to_set) {
        ll v = seg[id].set;
        seg[id*2].sum = (mid-l+1)*v;
        seg[id*2+1].sum = (r-mid)*v;
 
        seg[id*2].set = seg[id*2+1].set = v;
        seg[id*2].to_set = seg[id*2+1].to_set = 1;
 
        seg[id*2].add = seg[id*2+1].add = 0;
        seg[id].to_set = 0;
    }
 
    if (seg[id].add) {
        ll v = seg[id].add;
        seg[id*2].sum += (mid-l+1)*v;
        seg[id*2+1].sum += (r-mid)*v;
 
        if (seg[id*2].to_set) seg[id*2].set += v;
        else seg[id*2].add += v;
 
        if (seg[id*2+1].to_set) seg[id*2+1].set += v;
        else seg[id*2+1].add += v;
 
        seg[id].add = 0;
    }
}
 
void range_add(int id, int l, int r, int ql, int qr, ll v) {
    if (ql<=l && r<=qr) {
        seg[id].sum += (r-l+1)*v;
        if (seg[id].to_set) seg[id].set += v;
        else seg[id].add += v;
        return;
    }
    push(id,l,r);
    int mid = (l+r)/2;
    if (ql<=mid) range_add(id*2,l,mid,ql,qr,v);
    if (qr>mid) range_add(id*2+1,mid+1,r,ql,qr,v);
    seg[id].sum = seg[id*2].sum + seg[id*2+1].sum;
}
 
void range_set(int id, int l, int r, int ql, int qr, ll v) {
    if (ql<=l && r<=qr) {
        seg[id].sum = (r-l+1)*v;
        seg[id].set = v;
        seg[id].to_set = 1;
        seg[id].add = 0;
        return;
    }
    push(id,l,r);
    int mid = (l+r)/2;
    if (ql<=mid) range_set(id*2,l,mid,ql,qr,v);
    if (qr>mid) range_set(id*2+1,mid+1,r,ql,qr,v);
    seg[id].sum = seg[id*2].sum + seg[id*2+1].sum;
}
 
ll query(int id, int l, int r, int ql, int qr) {
    if (ql<=l && r<=qr) return seg[id].sum;
    push(id,l,r);
    int mid = (l+r)/2;
    ll res = 0;
    if (ql<=mid) res += query(id*2,l,mid,ql,qr);
    if (qr>mid) res += query(id*2+1,mid+1,r,ql,qr);
    return res;
}
 
int main() {
    ios::sync_with_stdio(0); cin.tie(0);
 
    cin >> n >> q;
    for (int i=1;i<=n;++i) cin >> a[i];
 
    build(1,1,n);
 
    while (q--) {
        int type,a,b;
        ll x;
        cin >> type >> a >> b;
        if (type==1) {
            cin >> x;
            range_add(1,1,n,a,b,x);
        } else if (type==2) {
            cin >> x;
            range_set(1,1,n,a,b,x);
        } else {
            cout << query(1,1,n,a,b) << "\n";
        }
    }
    return 0;
}
```

## Polynomial Queries [problem](https://cses.fi/problemset/task/1736)
```markdown
題目: 

- 給定長度為 n 的整數陣列 a[1..n]。
- 有 q 個操作，每次為以下兩種之一：
  - `1 l r`：對區間 [l, r] 做如下操作：
    - a[l] += 1, a[l+1] += 2, ..., a[r] += (r - l + 1)
  - `2 l r`：詢問區間 [l, r] 的總和。
```
``` markdown
解法 : 

### 1. 把操作視為等差數列加法：
   - 每次更新相當於往區間 [l, r] 加上一個首項為 1、公差為 1 的等差數列。
   - 可以推廣成加任意首項為 s、公差為 d 的等差級數。

---

### 2. 延遲標記處理兩個變數（s, d）：
   - 使用 Lazy Segment Tree，每個節點標記：
     - `lazy_start`: 延遲加的首項
     - `lazy_d`: 延遲加的公差
   - 使用 `calc(len, s, d)` 計算區間長度為 len 的等差數列總和：
     - `s + (s+d) + ... + (s+(len-1)d)` = `s * len + d * len*(len-1)/2`

---

### 3. 推進 lazy 時要調整首項：
   - 對於左子區間，首項不變。
   - 對於右子區間，首項 = 父首項 + 公差 × 左子長度。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
 
const int N = 2e5 + 5;
 
struct Node {
    ll sum = 0;
    ll lazy_start = 0, lazy_d = 0;
} seg[N*4];
 
int n, q;
ll a[N];
 
void build(int i, int l, int r) {
    if (l == r) {
        seg[i].sum = a[l];
        return;
    }
    int m = (l + r) / 2;
    build(i*2, l, m);
    build(i*2+1, m+1, r);
    seg[i].sum = seg[i*2].sum + seg[i*2+1].sum;
}
 
ll calc(int len, ll s, ll d) {
    return s * len + d * 1LL * len * (len-1) / 2;
}
 
void apply(int i, int l, int r, ll s, ll d) {
    seg[i].sum += calc(r-l+1, s, d);
    seg[i].lazy_start += s;
    seg[i].lazy_d += d;
}
 
void push(int i, int l, int r) {
    if (seg[i].lazy_start == 0 && seg[i].lazy_d == 0) return;
 
    int m = (l + r) / 2;
    int left_len = m - l + 1;
 
    // 左兒子：首項 = 父首項，公差不變
    apply(i*2, l, m, seg[i].lazy_start, seg[i].lazy_d);
 
    // 右兒子：首項 = 父首項 + 左兒子長度*公差
    apply(i*2+1, m+1, r, seg[i].lazy_start + seg[i].lazy_d * left_len, seg[i].lazy_d);
 
    seg[i].lazy_start = seg[i].lazy_d = 0;
}
 
void update(int i, int l, int r, int ql, int qr, ll s, ll d) {
    if (qr < l || ql > r) return;
    if (ql <= l && r <= qr) {
        ll start = s + (l - ql) * d;
        apply(i, l, r, start, d);
        return;
    }
    push(i, l, r);
    int m = (l + r) / 2;
    update(i*2, l, m, ql, qr, s, d);
    update(i*2+1, m+1, r, ql, qr, s, d);
    seg[i].sum = seg[i*2].sum + seg[i*2+1].sum;
}
 
ll query(int i, int l, int r, int ql, int qr) {
    if (qr < l || ql > r) return 0;
    if (ql <= l && r <= qr) return seg[i].sum;
    push(i, l, r);
    int m = (l + r) / 2;
    return query(i*2, l, m, ql, qr) + query(i*2+1, m+1, r, ql, qr);
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> a[i];
 
    build(1, 1, n);
 
    while (q--) {
        int type, l, r;
        cin >> type >> l >> r;
 
        if (type == 1) {
            update(1, 1, n, l, r, 1, 1);
        } else {
            cout << query(1, 1, n, l, r) << "\n";
        }
    }
}
```

## Range Queries and Copies [problem](https://cses.fi/problemset/task/1737)
```markdown
題目: 

- 給定長度為 n 的陣列 a[1..n]。
- 有 q 次操作，共三種類型：
  1. `1 k a x`：對第 k 版本的陣列進行修改，將第 a 個位置設為 x。
  2. `2 k a b`：查詢第 k 版本陣列中區間 [a, b] 的總和。
  3. `3 k`：複製第 k 版本陣列，產生一個新的版本（為新的根）。
- 最初的版本為第 0 個版本。
```
``` markdown
解法 : 

### 1. 使用 Persistent Segment Tree（可持久化線段樹）：
   - 每次修改或複製，都產生一棵新樹（實際上僅複製 O(log n) 個節點）
   - 修改操作的時間與空間複雜度皆為 O(log n)
   - 版本透過指針記錄在 `roots[]` 中，每次產生新版本就推入新 root。

---

### 2. 操作說明：
   - `build()`：建構初始線段樹，儲存第 0 版本。
   - `update()`：從某個舊版本 root 出發，僅建立必要的新節點產生新版本。
   - `query()`：在指定版本的 root 上查詢區間和。
   - `copy()`：直接複製 root 指針，空間 O(1)，無需實際複製整棵樹。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
 
const int MAXN = 2e5 + 5;
const int MAXQ = 2e5 + 5;
const int MAXLOG = 20;  // log2(MAXN)
 
struct Node {
    ll sum;
    Node *left, *right;
    Node(ll s = 0) : sum(s), left(nullptr), right(nullptr) {}
};
 
int n, q;
ll arr[MAXN];
vector<Node*> roots;
 
// 建樹
Node* build(int l, int r) {
    Node* node = new Node();
    if (l == r) {
        node->sum = arr[l];
        return node;
    }
    int m = (l + r) / 2;
    node->left = build(l, m);
    node->right = build(m+1, r);
    node->sum = node->left->sum + node->right->sum;
    return node;
}
 
// 更新
Node* update(Node* prev, int l, int r, int pos, ll val) {
    Node* node = new Node();
    if (l == r) {
        node->sum = val;
        return node;
    }
    int m = (l + r) / 2;
    if (pos <= m) {
        node->left = update(prev->left, l, m, pos, val);
        node->right = prev->right;
    } else {
        node->left = prev->left;
        node->right = update(prev->right, m+1, r, pos, val);
    }
    node->sum = node->left->sum + node->right->sum;
    return node;
}
 
// 查詢
ll query(Node* node, int l, int r, int ql, int qr) {
    if (qr < l || ql > r) return 0;
    if (ql <= l && r <= qr) return node->sum;
    int m = (l + r) / 2;
    return query(node->left, l, m, ql, qr) +
           query(node->right, m+1, r, ql, qr);
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> arr[i];
 
    roots.push_back(build(1, n));
 
    while (q--) {
        int type;
        cin >> type;
 
        if (type == 1) {
            int k, a, x;
            cin >> k >> a >> x;
            k--;  // 0-based
            roots[k] = update(roots[k], 1, n, a, x);
        } 
        else if (type == 2) {
            int k, a, b;
            cin >> k >> a >> b;
            k--;
            cout << query(roots[k], 1, n, a, b) << "\n";
        } 
        else if (type == 3) {
            int k;
            cin >> k;
            k--;
            roots.push_back(roots[k]);  // 複製指針即可
        }
    }
}
```

## Missing Coin Sum Queries
# Graph Algorithms(36 題)
## Counting Rooms [problem](https://cses.fi/problemset/task/1192)
```markdown
題目: 

給定一個 `N × M` 的地圖，由 `#` (牆) 和 `.` (地板) 組成。  
請計算圖中共有多少個「房間」（相連的 `.` 區域，四方向相連）。
```
``` markdown
解法 : 

### 1. 狀態定義
- 使用 `rooms[i][j]`：
  - `-1`：牆
  - `0`：尚未拜訪的空地
  - `>0`：已經標記的房間編號

---

### 2. DFS
對於每一個尚未拜訪的空地 `(i, j)`：
1. 開啟新房間計數 `cnt++`。
2. 使用 DFS 標記所有與 `(i, j)` 四方向相連的空地。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
vector<vector<int>> rooms(1005 + 2, vector<int>(1005 + 2, -1));
 
void DFS(int x, int y, int cnt) {
    int dir_x[4] = {1, -1, 0, 0}, dir_y[4] = {0, 0, 1, -1};
    for (int i = 0; i < 4; ++i) {
        if (rooms[x + dir_x[i]][y + dir_y[i]])
            continue;
        rooms[x + dir_x[i]][y + dir_y[i]] = cnt;
        DFS(x + dir_x[i], y + dir_y[i], cnt);
    }
}
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    for (int i = 1; i <= N; ++i) {
        string input; 
        cin >> input;
        for (int j = 1; j <= M; ++j) {
            rooms[i][j] = input[j - 1] == '#' ? -1 : 0;
        }
    }
 
    LL cnt = 0;
    for (int i = 1; i <= N; ++i) {
        for (int j = 1; j <= M; ++j) {
            if (!rooms[i][j]) {
                DFS(i, j, ++cnt);
            }
        }
    }
    cout << cnt;
}
```

## Labyrinth [problem](https://cses.fi/problemset/task/1193)
```markdown
題目: 

給定一個 `N × M` 的迷宮：
- `#` 代表牆壁
- `.` 代表空地
- `A` 起點
- `B` 終點  

請判斷是否能從 `A` 走到 `B`。若可達，輸出：
1. "YES"
2. 最短步數
3. 路徑（UDLR 字串）
若不可達，輸出 "NO"。
```
``` markdown
解法 : 

### 1. BFS 最短路徑
- 使用 BFS 計算從 `A` 到所有點的最短距離。
- 每個點的距離儲存在 `maps[i][j]` 中，初始化為 `INF`，牆為 `-1`。

---

### 2. 路徑回溯
- BFS 結束後，若 `maps[B] != INF`，則從 `B` 反向回溯：
  - 從 `B` 不斷往距離減一的相鄰格子移動。
  - 記錄對應方向（U/D/L/R）。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;
 
int dir_x[] = {1, -1, 0, 0}, dir_y[] = {0, 0, 1, -1};
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    pLL start, end;
    vector<vector<LL>> maps(N + 2, vector<LL>(M + 2, -1));
    for (int i = 1; i <= N; ++i) {
        string input; cin >> input;
        for (int j = 1; j <= M; ++j) {
            maps[i][j] = input[j-1] == '#' ? -1 : LL(1e18);
            if (input[j - 1] == 'A') start = {i, j};
            if (input[j - 1] == 'B') end = {i, j};
        }
    }
    maps[start.first][start.second] = 0;
 
    queue<pLL> q;
    q.push(start);
    while (!q.empty()) {
        pLL v = q.front(); q.pop();
        for (int i = 0; i < 4; ++i) {
            LL newX = v.first + dir_x[i], newY = v.second + dir_y[i];
            if (maps[newX][newY] <= maps[v.first][v.second] + 1) continue;
            maps[newX][newY] = maps[v.first][v.second] + 1;
            q.push({newX, newY});
        }
    }
 
    if (maps[end.first][end.second] != LL(1e18)) {
        cout << "YES\n";
        cout << maps[end.first][end.second] << '\n';
        pLL curLoc = end;
        LL len = maps[end.first][end.second];
        vector<char> ans;
        map<int, char> dic = {{0, 'D'}, {1, 'U'}, {2, 'R'}, {3, 'L'}};
 
        while (len > 0) {
            for (int i = 0; i < 4; ++i) {
                LL newX = curLoc.first - dir_x[i], newY = curLoc.second - dir_y[i];
                if (maps[newX][newY] == len - 1) {
                    curLoc = {newX, newY};
                    len--;
                    ans.push_back(dic[i]);
                    break;
                }
            }
        }
        reverse(ans.begin(), ans.end());
        for (auto e : ans) cout << e;
    } else {
        cout << "NO";
    }
}
```

## Building Roads [problem](https://cses.fi/problemset/task/1666)
```markdown
題目: 

給定 `N` 個城市與 `M` 條雙向道路。  
請找出需要新增的最少道路數量，使得所有城市互相連通，並輸出具體要新增的道路連接方案。
```
``` markdown
解法 : 

### 1. 圖的連通分量
- 使用 DFS 或 BFS 掃描所有節點，並記錄圖中所有連通分量的「代表節點」（head）。

---

### 2. 修建道路
- 若圖中有 `k` 個連通分量，則至少要新增 `k-1` 條邊才能連成一張連通圖。
- 一個簡單的做法：將所有分量的代表節點依序連接到第一個分量的代表節點（如 1）。

---

### 3. 步驟
1. 建立圖的鄰接表。
2. 透過 DFS/BFS 找出所有連通分量代表節點。
3. 輸出新增的邊：
head[0] 與 head[i] 相連 (for i = 1 ~ k-1)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
const LL SIZE = 1e5;
vector<LL> parent(SIZE + 1, -1);
vector<vector<LL>> edge(SIZE + 1);
 
void DFS(LL v, LL p) {
    for (auto e : edge[v]) {
        if (parent[e] != -1)
            continue;
        parent[e] = p;
        DFS(e, p);
    }
}
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    while (M--) {
        int a, b;
        cin >> a >> b;
        edge[a].push_back(b);
        edge[b].push_back(a);
    }
 
    set<LL> head;
    for (int i = 1; i <= N; ++i) {
        if (parent[i] == -1) {
            DFS(i, i);
            head.insert(i);
        }
    }
 
    cout << head.size() - 1 << '\n';
    auto it = head.begin();
    LL root = *it;
    ++it;
    for (; it != head.end(); ++it) {
        cout << root << " " << *it << '\n';
    }
}
```

## Message Route [problem](https://cses.fi/problemset/task/1667)
```markdown
題目: 

有 `N` 個城市與 `M` 條雙向道路，從城市 `1` 出發，請找到到城市 `N` 的最短路徑，並輸出：
1. 路徑長度
2. 具體路徑節點順序  
若無法到達，輸出 `IMPOSSIBLE`。
```
``` markdown
解法 : 

### 1. BFS (最短路徑)
- 由於圖是無權圖，BFS 可保證第一次到達某個節點時的距離即為最短距離。

### 2. 狀態定義
- `dis[i] = {距離, 前驅節點}`
  - `距離`: 從 1 到 i 的最短步數
  - `前驅節點`: 回溯路徑用

### 3. 演算法流程
1. 初始化 `dis[i].f = INF`，`dis[i].s = -1`
2. BFS 從節點 1 開始：
   - 若 `dis[e].f > dis[v].f + 1` → 更新距離與前驅
   - 將節點加入 queue
3. BFS 結束後：
   - 若 `dis[N].f == INF` → 無解
   - 否則回溯 `dis[N].s` 重建路徑
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;
 
const LL SIZE = 1e5;
vector<pLL> dis(SIZE + 1, {LL(1e18), -1});
vector<vector<LL>> edge(SIZE + 1);
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    while (M--) {
        LL a, b;
        cin >> a >> b;
        edge[a].push_back(b);
        edge[b].push_back(a);
    }
 
    queue<LL> q;
    dis[1] = {0, -1};
    q.push(1);
 
    while (!q.empty()) {
        LL v = q.front(); q.pop();
        for (LL e : edge[v]) {
            if (dis[e].first > dis[v].first + 1) {
                dis[e] = {dis[v].first + 1, v};
                q.push(e);
            }
        }
    }
 
    if (dis[N].first != LL(1e18)) {
        vector<LL> ans;
        for (LL cur = N; cur != -1; cur = dis[cur].second)
            ans.push_back(cur);
        reverse(ans.begin(), ans.end());
 
        cout << ans.size() << '\n';
        for (LL e : ans) cout << e << ' ';
    } else {
        cout << "IMPOSSIBLE";
    }
}
```

## Building Teams [problem](https://cses.fi/problemset/task/1668)
```markdown
題目: 

給定一個 `N` 個節點與 `M` 條邊的無向圖，需將所有節點分成兩個團隊，並保證：
- 每條邊的兩端節點屬於不同的團隊。  

若能分組，輸出每個節點的團隊編號（1 或 2），否則輸出 "IMPOSSIBLE"。
```
``` markdown
解法 : 

### 1. 二分圖檢查
- 建立鄰接表存圖。
- 使用 DFS 或 BFS 嘗試將節點染色（1 或 2）。
  - 若遇到相鄰節點顏色相同 → 圖不是二分圖 → 輸出 "IMPOSSIBLE"。

---

### 2. 狀態定義
- `teams[i]`：
  - `-1` → 尚未分組
  - `1` → 第一隊
  - `2` → 第二隊

---

### 3. 演算法流程
1. 從 1~N 掃描所有節點，若未分組 → 從該節點開始 DFS：
   - 將節點染色為 1
   - 遍歷所有相鄰節點：
     - 若相鄰節點與當前節點同色 → 不可分隊
     - 若未染色 → 分配另一組，繼續 DFS
2. 若 DFS 中檢查通過 → 成功輸出分隊結果。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
const LL SIZE = 1e5;
vector<LL> teams(SIZE + 1, -1);
vector<vector<LL>> edge(SIZE + 1);
 
bool DFS(LL v, LL g) {
    bool ret = true;
    for (auto e : edge[v]) {
        if (e == v) continue;
        if (teams[e] == g) {
            return false; // 同組衝突
        } 
        else if (teams[e] != -1) {
            continue;
        }
        teams[e] = (g == 1 ? 2 : 1);
        ret &= DFS(e, teams[e]);
    }
    return ret;
}
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    while (M--) {
        LL a, b;
        cin >> a >> b;
        edge[a].push_back(b);
        edge[b].push_back(a);
    }
 
    bool conflict = true;
    for (int i = 1; i <= N && conflict; ++i) {
        if (teams[i] == -1) {
            teams[i] = 1;
            conflict &= DFS(i, 1);
        }
    }
 
    if (!conflict) {
        cout << "IMPOSSIBLE\n";
    } else {
        for (int i = 1; i <= N; ++i) {
            cout << teams[i] << ' ';
        }
    }
}
```

## Round Trip [problem](https://cses.fi/problemset/task/1669)
```markdown
題目: 

給定一個 `N` 個節點與 `M` 條邊的無向圖，請判斷圖中是否存在一條簡單環路：
- 若存在，輸出該環路的節點序列。
- 若不存在，輸出 "IMPOSSIBLE"。
```
``` markdown
解法 : 

### 1. 狀態定義
    - visited[i]：節點 i 是否被拜訪過
    - cycle：存放回溯出的環路
    
---

### 2. 演算法流程
    - 對每個未訪問節點執行 DFS：
    - 將節點標記為已訪問
    - 遍歷相鄰節點：
        - 若未訪問 → 紀錄 parent，遞迴 DFS
        - 若已訪問且不是父節點 → 發現環路，沿 parent 回溯得到完整路徑
    - 若找不到環路 → 輸出 "IMPOSSIBLE"
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
bool cmp(pLL a, pLL b){
    return (a.f == b.f) ? a.s > b.s : a.f < b.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
struct Edge {
    int u, v;
    LL w;
};
 
vector<LL> parent(SIZE + 1, 0), indeg(SIZE + 1, 0);
vector<vector<LL>> edge(SIZE + 1, vector<LL>());
 
bool found = false;
vector<bool> visited(SIZE);
 
void dfs(int u, int p) {
    visited[u] = true;
    for (int v : edge[u]) {
        if (v == p) continue;  // 無向圖跳過來的邊
        if (visited[v]) {
            vector<int> cycle;
            int cur = u;
            cycle.push_back(v);
            while (cur != v) {
                cycle.push_back(cur);
                cur = parent[cur];
            }
            cycle.push_back(v);
            reverse(cycle.begin(), cycle.end());
            cout << cycle.size() << "\n";
            for (int x : cycle) cout << x << " ";
            cout << "\n";
            found = true;
            exit(0);
        } else {
            parent[v] = u;
            dfs(v, u);
        }
    }
}
 
int main(){
    fastio;
    int N, M;
    cin >> N >> M; 
    
    while(M--){
        LL a, b;
        cin >> a >> b;
        edge[a].push_back(b);
        edge[b].push_back(a);
    }
 
    for(int i = 1; i <= N; ++i){
        if(!parent[i]){
            parent[i] = -1;
            dfs(i, -1);
        }
    }
 
    cout << "IMPOSSIBLE";
}
```

## Monsters [problem](https://cses.fi/problemset/task/1194)
```markdown
題目: 

你在一個 `n × m` 的迷宮中，地圖由以下元素構成：
- `#`：牆壁
- `.`：空地
- `A`：玩家初始位置
- `M`：怪物
玩家每次可以上下左右移動一步，怪物也會同步移動一步。玩家不能走到怪物所在或將要到達的格子。
若玩家能在怪物抓到他之前到達迷宮邊界則可逃脫，否則輸出 "NO"。
```
``` markdown
解法 : 

### 1. 前置處理
    - 建立 `monster_time` 陣列，記錄每格被怪物到達的最早時間。
    - 建立 `player_time` 陣列，記錄玩家到達該格的時間。
    - 建立 `parent` 陣列，用於路徑回溯。

---

### 2. BFS from monsters
    - 對所有怪物位置同時 BFS，計算每格的最早怪物到達時間。

---

### 3. BFS from player
    - 從玩家位置開始 BFS。
    - 玩家只能移動到 `player_time[x][y] + 1 < monster_time[nx][ny]` 的格子。
    - 若到達邊界，立即回溯路徑並輸出。

---

### 4. 若 BFS 結束仍未到達邊界 → 輸出 "NO"。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
struct Node {
    int x, y;
};
 
int n, m;
vector<string> grid;
vector<vector<int>> monster_time, player_time;
vector<vector<pair<int,int>>> parent;
 
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};
char move_char[] = {'U', 'D', 'L', 'R'};
 
bool is_boundary(int x, int y) {
    return x == 0 || y == 0 || x == n-1 || y == m-1;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    cin >> n >> m;
    grid.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> grid[i];
    }
 
    monster_time.assign(n, vector<int>(m, INT_MAX));
    player_time.assign(n, vector<int>(m, -1));
    parent.assign(n, vector<pair<int,int>>(m, {-1,-1}));
 
    queue<Node> q_monsters, q_player;
    Node start;
 
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 'M') {
                q_monsters.push({i,j});
                monster_time[i][j] = 0;
            } else if (grid[i][j] == 'A') {
                start = {i,j};
            }
        }
    }
 
    // BFS from monsters
    while (!q_monsters.empty()) {
        auto [x,y] = q_monsters.front(); q_monsters.pop();
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d];
            int ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
                grid[nx][ny] != '#' && monster_time[nx][ny] == INT_MAX) {
                monster_time[nx][ny] = monster_time[x][y] + 1;
                q_monsters.push({nx,ny});
            }
        }
    }
 
    // BFS from player
    q_player.push(start);
    player_time[start.x][start.y] = 0;
 
    while (!q_player.empty()) {
        auto [x,y] = q_player.front(); q_player.pop();
        if (is_boundary(x,y)) {
            string path;
            while (make_pair(x,y) != make_pair(start.x,start.y)) {
                auto [px,py] = parent[x][y];
                for (int d = 0; d < 4; d++) {
                    if (px + dx[d] == x && py + dy[d] == y) {
                        path.push_back(move_char[d]);
                        break;
                    }
                }
                tie(x,y) = make_pair(px,py);
            }
            reverse(path.begin(), path.end());
            cout << "YES\n";
            cout << path.size() << '\n';
            cout << path << '\n';
            return 0;
        }
 
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d];
            int ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
                grid[nx][ny] != '#' && player_time[nx][ny] == -1) {
                if (player_time[x][y] + 1 < monster_time[nx][ny]) {
                    player_time[nx][ny] = player_time[x][y] + 1;
                    parent[nx][ny] = {x,y};
                    q_player.push({nx,ny});
                }
            }
        }
    }
 
    cout << "NO\n";
    return 0;
}
```

## Shortest Routes I [problem](https://cses.fi/problemset/task/1671)
```markdown
題目: 

給定一個 `N` 個節點與 `M` 條有向邊的圖，每條邊有非負權重。
請求出從節點 1 到所有其他節點的最短距離。
```
``` markdown
解法 : 

### 1. 資料結構
   - 使用鄰接表 `edge[u]` 儲存所有邊。
   - `dis[i]` 儲存節點 1 到節點 i 的最短距離與父節點。

---

### 2. 演算法
   - 採用 Dijkstra 演算法：
     - 以最小堆 `priority_queue` 取出當前距離最小的節點。
     - 檢查是否能更新鄰居距離，若能則更新並推入堆中。

---

### 3. 輸出
   - 依序輸出從節點 1 到所有節點的最短距離。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;

vector<vector<pLL>> edge(SIZE + 10);  // edge[u] = {{v, weight}, ...}
vector<pLL> dis(SIZE + 10, {INF, -1}); // dis[i] = {min_dist, parent}
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    for (LL i = 0; i < M; ++i) {
        LL u, v, w;
        cin >> u >> v >> w;
        edge[u].push_back({v, w});
    }
 
    // Dijkstra
    priority_queue<pLL, vector<pLL>, greater<pLL>> pq;
    dis[1] = {0, -1};
    pq.push({0, 1});
 
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dis[u].f) continue;  // lazy delete
 
        for (auto &[v, w] : edge[u]) {
            if (dis[v].f > dis[u].f + w) {
                dis[v] = {dis[u].f + w, u};
                pq.push({dis[v].f, v});
            }
        }
    }
 
    // Output distances from node 1
    for (LL i = 1; i <= N; ++i) {
        cout << dis[i].f << ' ';
    }
    cout << '\n';
}
```

## Shortest Routes II [problem](https://cses.fi/problemset/task/1672)
```markdown
題目: 

給定一個 `n` 個節點與 `m` 條邊的無向圖，每條邊有非負權重。
你需要回答 `q` 筆查詢，每筆查詢詢問從節點 `u` 到節點 `v` 的最短距離。
如果兩點之間沒有路徑，輸出 `-1`。
```
``` markdown
解法 : 

### 1. Floyd–Warshall 演算法
   - 使用 `dist[i][j]` 儲存節點 i 到 j 的最短距離。
   - 初始化：
     - `dist[i][i] = 0`
     - 其他距離初始為 `INF`
   - 讀入邊時，若有重邊取最小權重。

---

### 2. 狀態轉移
   - 對所有節點 k：
     - 對所有節點 i：
       - 對所有節點 j：
         - 嘗試透過 k 更新 i 到 j 的距離：
           - dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

---

### 3. 查詢
   - 若 `dist[u][v] == INF` → 輸出 `-1`
   - 否則輸出 `dist[u][v]`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
#define SIZE LL(505)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
LL dist[SIZE][SIZE];
 
int main() {
    fastio;
    int n, m, q;
    cin >> n >> m >> q;
 
    // 初始化距離矩陣
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j)
            dist[i][j] = (i == j ? 0 : INF);
 
    // 讀入邊，注意重邊取最小
    while (m--) {
        int a, b;
        LL w;
        cin >> a >> b >> w;
        dist[a][b] = min(dist[a][b], w);
        dist[b][a] = min(dist[b][a], w);
    }
 
    // Floyd–Warshall
    for (int k = 1; k <= n; ++k)
        for (int i = 1; i <= n; ++i)
            for (int j = 1; j <= n; ++j)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
 
    // 查詢
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << (dist[u][v] == INF ? -1 : dist[u][v]) << '\n';
    }
}
```

## High Score [problem](https://cses.fi/problemset/task/1673)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條有向邊的圖，每條邊有權重。
需要從節點 1 出發，計算到節點 `n` 的**最大路徑和**。
```
``` markdown
解法 : 

### 1. **Bellman–Ford (最長路徑)**
   - 將邊權重取相反數，轉換成最短路徑問題。
   - 使用 Bellman–Ford 更新 `n-1` 次。

---

### 2. **檢查負環**
   - 若在第 `n` 次仍有距離可更新，則存在可無限增長的路徑。

---

### 3. **篩選有效負環**
   - 透過 BFS 檢查：
     - 該節點是否從 1 可達
     - 且能到達 n
   - 若滿足上述條件 → 輸出 `-1`

---

### 4. **輸出結果**
   - 若無負環影響 → 輸出 `-dis[n]`（將距離取回正數）。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;

struct Edge {
    int u, v;
    LL w;
};
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<Edge> edges;
    vector<vector<int>> graph(n + 1), rev_graph(n + 1);
    vector<LL> dis(n + 1, INF);
    vector<bool> reach_from_start(n + 1, false), reach_to_end(n + 1, false);
 
    for (int i = 0; i < m; ++i) {
        int a, b; LL c;
        cin >> a >> b >> c;
        edges.push_back({a, b, -c}); // negate weight for longest path
        graph[a].push_back(b);
        rev_graph[b].push_back(a);
    }
 
    // Step 1: Bellman–Ford from node 1
    dis[1] = 0;
    for (int i = 1; i < n; ++i) {
        for (auto &[u, v, w] : edges) {
            if (dis[u] == INF) continue;
            if (dis[u] + w < dis[v]) {
                dis[v] = dis[u] + w;
            }
        }
    }
 
    // Step 2: check for changes in nth iteration
    vector<bool> in_cycle(n + 1, false);
    for (auto &[u, v, w] : edges) {
        if (dis[u] != INF && dis[u] + w < dis[v]) {
            in_cycle[v] = true;
        }
    }
 
    // Step 3: BFS to mark reachable from 1
    queue<int> q;
    q.push(1);
    reach_from_start[1] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : graph[u]) {
            if (!reach_from_start[v]) {
                reach_from_start[v] = true;
                q.push(v);
            }
        }
    }
 
    // Step 4: BFS to mark reachable to n (reverse edges)
    q.push(n);
    reach_to_end[n] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : rev_graph[u]) {
            if (!reach_to_end[v]) {
                reach_to_end[v] = true;
                q.push(v);
            }
        }
    }
 
    // Step 5: check if any cycle node is on valid path from 1 to n
    for (int i = 1; i <= n; ++i) {
        if (in_cycle[i] && reach_from_start[i] && reach_to_end[i]) {
            cout << "-1\n";
            return 0;
        }
    }
 
    // No infinite path, output longest path from 1 to n
    cout << -dis[n] << "\n";
    return 0;
}
```

## Flight Discount [problem](https://cses.fi/problemset/task/1195)
```markdown
題目: 

給定一張有 `N` 個節點與 `M` 條有向邊的圖，每條邊有一個權重。
你要從節點 `1` 出發到節點 `N`，並且你可以對任意一條邊使用一次「折扣」：
- 折扣可將該邊權重減半（向下取整）。

目標是求出使用一次折扣後的最短路徑距離。
```
``` markdown
解法 : 

### 1. 反向建圖
   - 由於折扣只能用一次，且需比較從終點回溯的可能路徑，我們將圖邊反向處理，從 `N` 開始進行 
     `Dijkstra`。

---

### 2. Dijkstra with state
   - 使用 `dis[u] = {距離, 已折扣過程中的最大邊權}`。
   - 若發現一條邊的權重大於目前的最大邊權，計算折扣差值 `diff`：
     diff = (w - floor(w/2)) - (maxW - floor(maxW/2))
     並更新距離。

---

### 3. 終止條件
   - 當完成 Dijkstra 後，輸出從 `1` 到 `N` 的最短距離。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
vector<vector<pLL>> edge(SIZE + 10);
vector<pLL> dis(SIZE + 10, {INF, -1});
 
int main(){
    fastio;
    int N, M;
    cin >> N >> M; 
    
    while(M--){
        LL a, b, w;
        cin >> a >> b >> w;
        edge[b].push_back({a, w});
    }
    
    priority_queue<pair<pLL, LL>, vector<pair<pLL, LL>>, greater<pair<pLL, LL>>> pq;
    dis[N] = {0, 0};
    pq.push({{0, 0}, N});
 
    while (!pq.empty()) {
        auto [D, u] = pq.top(); pq.pop();
        auto [d, maxW] = D;
        if (d > dis[u].f) continue;
 
        for (auto &[v, w] : edge[u]) {
            if (dis[u].f == INF) continue;
            LL diff = 0;
            if (w > maxW) {
                diff = (w - (w/2)) - (maxW - (maxW/2));
            }
            if (dis[v].f > dis[u].f + w - diff) {
                dis[v] = {dis[u].f + w - diff, max(maxW, w)};
                pq.push({{dis[v].f, max(maxW, w)}, v});
            }
        }
    }
 
    cout << dis[1].f;
}
```

## Cycle Finding [problem](https://cses.fi/problemset/task/1197)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條有向邊的圖，每條邊可能有負權重。
需要判斷圖中是否存在「負環」：
- 若不存在，輸出 `NO`
- 若存在，輸出 `YES` 並輸出負環中的節點。
```
``` markdown
解法 : 

### 1. **Bellman–Ford**
   - 使用 Bellman–Ford 演算法檢測負環：
     - 初始所有距離 `dis[i] = 0`
     - 進行 `n` 次鬆弛
     - 若在第 `n` 次仍能更新距離，表示存在負環。

---

### 2. **重建負環**
   - 若偵測到負環：
     - 透過 `parent` 陣列回溯 `n` 次，確保到達負環內的節點。
     - 從該節點不斷回溯，直到回到起點形成負環。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e18)
#define MOD LL((1e9) + 7)
#define SIZE LL(505)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;

struct Edge {
    int u, v;
    LL w;
};
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<Edge> edges;
    vector<LL> dis(n + 1, 0);
    vector<int> parent(n + 1, -1);
 
    for (int i = 0; i < m; ++i) {
        int a, b; LL c;
        cin >> a >> b >> c;
        edges.push_back({a, b, c});
    }
 
    int x = -1;
    for (int i = 1; i <= n; ++i) {
        x = -1;
        for (auto &[u, v, w] : edges) {
            if (dis[u] + w < dis[v]) {
                dis[v] = dis[u] + w;
                parent[v] = u;
                x = v;
            }
        }
    }
 
    if (x == -1) {
        cout << "NO\n";
    } else {
        // 回到 cycle 上
        for (int i = 0; i < n; ++i) x = parent[x];
 
        vector<int> cycle;
        int cur = x;
        do {
            cycle.push_back(cur);
            cur = parent[cur];
        } while (cur != x);
        cycle.push_back(x);
        reverse(cycle.begin(), cycle.end());
 
        cout << "YES\n";
        for (int v : cycle) cout << v << " ";
        cout << "\n";
    }
}
```

## Flight Routes [problem](https://cses.fi/problemset/task/1196)
```markdown
題目: 

給定一張 `n` 個節點與 `m` 條邊的有向圖，圖上每條邊有非負權重。
需要找出從節點 `1` 到節點 `n` 的 `k` 條最短路徑（可重複使用邊與節點）。
```
``` markdown
解法 : 

### 1. 修改版 Dijkstra
   - 不僅記錄到達每個節點的最短路徑，還要保留最多 `k` 條路徑。
   - 使用最小堆 `priority_queue`：
     - 每次彈出目前代價最小的狀態 `(cost, node)`。
     - 用 `cnt[node]` 記錄到達該節點的次數。

---

### 2. 路徑計算
   - 每次到達 `n` 時將代價加入答案 `ans`。
   - 若答案長度達到 `k` 則停止。
   - 若到達某節點次數超過 `k`，則不再擴展該節點。

---

### 3. 結果
   - 依照順序輸出前 `k` 個最短路徑距離。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
using ll = long long;
using pii = pair<ll, int>;
 
const int MAXN = 1e5 + 5;
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    int n, m, k;
    cin >> n >> m >> k;
 
    vector<vector<pii>> g(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].emplace_back(v, w);
    }
 
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> cnt(n + 1, 0);
 
    pq.emplace(0, 1);
 
    vector<ll> ans;
 
    while (!pq.empty()) {
        auto [cost, u] = pq.top(); pq.pop();
 
        cnt[u]++;
        if (u == n) ans.push_back(cost);
        if (ans.size() == k) break;
        if (cnt[u] > k) continue;
 
        for (auto [v, w] : g[u]) {
            pq.emplace(cost + w, v);
        }
    }
 
    for (auto x : ans) cout << x << " ";
    cout << "\n";
}
```

## Round Trip II [problem](https://cses.fi/problemset/task/1678)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條邊的有向圖。
需要檢查圖中是否存在一個「有向環」：
- 若存在，輸出該環的節點序列。
- 若不存在，輸出 `IMPOSSIBLE`。
```
``` markdown
解法 : 

### 1. DFS + 拓樸顏色標記
   - `color[u] = 0` → 尚未訪問
   - `color[u] = 1` → DFS 過程中（灰色）
   - `color[u] = 2` → 已完成（黑色）
   - 在 DFS 中若遇到 `color[v] == 1`，表示存在回邊（back edge），即有向環。

---

### 2. 透過 `parent` 回溯
   - 找到回邊後，從當前節點一路回溯到環的起點。
   - 將節點順序反轉得到正確環路。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5 + 5;
vector<int> adj[N];
int color[N]; // 0 = white, 1 = gray, 2 = black
int parent[N];
vector<int> cycle;
 
bool dfs(int u) {
    color[u] = 1;
    for (int v : adj[u]) {
        if (color[v] == 0) {
            parent[v] = u;
            if (dfs(v)) return true;
        } else if (color[v] == 1) {
            cycle.push_back(v);
            int cur = u;
            while (cur != v) {
                cycle.push_back(cur);
                cur = parent[cur];
            }
            cycle.push_back(v);
            reverse(cycle.begin(), cycle.end());
            return true;
        }
    }
    color[u] = 2;
    return false;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v); // directed graph
    }
 
    for (int i = 1; i <= n; ++i) {
        if (color[i] == 0) {
            if (dfs(i)) break;
        }
    }
 
    if (!cycle.empty()) {
        cout << cycle.size() << "\n";
        for (int x : cycle) cout << x << ' ';
        cout << '\n';
    } else {
        cout << "IMPOSSIBLE\n";
    }
    return 0;
}
```

## Course Schedule [problem](https://cses.fi/problemset/task/1679)
```markdown
題目: 

給定一張 `n` 個節點與 `m` 條邊的有向圖，表示 `m` 個先修課程關係：
- 邊 `a → b` 代表課程 `a` 必須先於 `b`。
你需要判斷是否能完成所有課程，若能，輸出一種可能的修課順序；
若存在循環依賴，輸出 `IMPOSSIBLE`。
```
``` markdown
解法 : 

### 1. Kahn's Algorithm (BFS Topological Sort)
   - 建立 `indeg[i]` 儲存每個節點的入度。
   - 將所有入度為 0 的節點加入佇列。
   - 不斷取出節點並刪除其邊，更新相鄰節點的入度。
   - 若某節點入度歸零，加入佇列。

---

### 2. 判斷結果
   - 若排序結果長度等於 `n` → 有效拓樸序列。
   - 否則，圖中存在循環 → 輸出 `IMPOSSIBLE`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<vector<LL>> edges(n + 1);
    vector<LL> indeg(n + 1, 0);
    for(int i = 0; i < m; ++i){
        int a, b;
        cin >> a >> b;
        edges[a].push_back(b);
        indeg[b]++;
    }
 
    queue<LL> q;
    vector<LL> ans;
    for(int i = 1; i <= n; ++i){
        if(!indeg[i])
            q.push(i);
    }
 
    while(!q.empty()){
        auto v = q.front();
        q.pop();
        ans.push_back(v);
 
        for(auto e: edges[v]){
            if(--indeg[e] == 0){
                q.push(e);
            }
        }
    }
 
    if(ans.size() != n)
        cout << "IMPOSSIBLE";
    else{
        for(auto e: ans)
            cout << e << ' ';
    }
}
```

## Longest Flight Route [problem](https://cses.fi/problemset/task/1680)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條邊的有向圖（無環 DAG）。
你需要從節點 `1` 出發，找到到節點 `n` 的最長路徑。
- 若存在路徑，輸出路徑長度與路徑。
- 若不存在，輸出 `IMPOSSIBLE`。
```
``` markdown
解法 : 

### 1. DFS 初始化入度
   - 先從節點 `1` DFS，計算所有可達節點的入度，避免處理與起點無關的節點。

---

### 2. 拓樸排序 + DP
   - 使用 BFS（Kahn's Algorithm）進行拓樸排序。
   - 在拓樸過程中用 `ans[v]` 儲存到 `v` 的最長路徑長度。
   - 用 `parent[v]` 追蹤前一個節點以重建路徑。

---

### 3. 重建路徑
   - 若 `parent[n]` 存在，回溯至節點 1 重建最長路徑並輸出。
   - 否則輸出 `IMPOSSIBLE`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<vector<LL>> edges(n + 1, vector<LL>());
    vector<LL> indeg(n + 1, 0);
    for(int i = 0; i < m; ++i){
        int a, b;
        cin >> a >> b;
        edges[a].push_back(b);
    }
 
    vector<bool> visited(n + 1, false);
    function<void(int)> dfs = [&](int u) {
        visited[u] = true;
        for (int v : edges[u]) {
            indeg[v]++;
            if (!visited[v]) dfs(v);
        }
    };
    dfs(1);
 
    queue<LL> q;
    vector<LL> ans(n + 1, 0), parent(n + 1, 0);
    q.push(1); ans[1] = 1;
 
    while(!q.empty()){
        auto v = q.front();
        q.pop();
 
        for(auto e: edges[v]){
            if(ans[v] + 1 > ans[e]){
                ans[e] = ans[v] + 1;
                parent[e] = v;
            }
            if(--indeg[e] == 0)
                q.push(e);
        }
    }
 
    if(parent[n]){
        LL cur = n;
        vector<LL> output;
        while(cur){
            output.push_back(cur);
            cur = parent[cur];
        }
        reverse(output.begin(), output.end());
        cout << output.size() << '\n';
        for(auto e : output)
            cout << e << ' ';
    } else {
        cout << "IMPOSSIBLE\n";
    }
}
```

## Game Routes [problem](https://cses.fi/problemset/task/1681)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條邊的有向圖，圖中沒有環。
你需要計算從節點 `1` 到節點 `n` 的不同路徑總數，結果對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. DAG + 拓樸排序
   - 因為圖中沒有環，可以用 DAG 動態規劃來計算路徑數。
   - `ans[u]` 代表從節點 `1` 到 `u` 的路徑總數。

---

### 2. 入度計算
   - 先用 DFS 從節點 1 開始，標記可達節點並計算入度。

---

### 3. 拓樸序 DP
   - 初始化：`ans[1] = 1`。
   - BFS（Kahn's Algorithm）依拓樸順序處理節點：
     ans[v] = (ans[v] + ans[u]) % MOD
     當入度為 0 時推入隊列。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
int main() {
    fastio;
    int n, m;
    cin >> n >> m;
 
    vector<vector<LL>> edges(n + 1, vector<LL>());
    vector<LL> indeg(n + 1, 0);
    for(int i = 0; i < m; ++i){
        int a, b;
        cin >> a >> b;
        edges[a].push_back(b);
    }
 
    vector<bool> visited(n + 1, false);
    function<void(int)> dfs = [&](int u) {
        visited[u] = true;
        for (int v : edges[u]) {
            indeg[v]++;
            if (!visited[v]) dfs(v);
        }
    };
    dfs(1);
 
    queue<LL> q;
    vector<LL> ans(n + 1, 0);
    q.push(1); ans[1] = 1;
 
    while(!q.empty()){
        auto v = q.front();
        q.pop();
 
        for(auto e: edges[v]){
            ans[e] = (ans[e] + ans[v]) % MOD;
            if(--indeg[e] == 0)
                q.push(e);
        }
    }
    cout << ans[n];
}
```

## Investigation [problem](https://cses.fi/problemset/task/1202)
```markdown
題目: 

給定一張有 `n` 個節點與 `m` 條有向邊的圖，每條邊有非負權重。
你需要從節點 `1` 出發到節點 `n`，計算：
1. 最短距離
2. 最短路徑總數（取模 `10^9+7`）
3. 最短路徑中最少邊數
4. 最短路徑中最多邊數
```
``` markdown
解法 : 

### 1. Dijkstra
   - 使用 Dijkstra 計算最短距離。
   - 除了距離 `dist[v]`，還需額外紀錄：
     - `cnt[v]` → 從 1 到 v 的最短路徑數量
     - `min_flights[v]` → 最短路徑中最少邊數
     - `max_flights[v]` → 最短路徑中最多邊數

---

### 2. 狀態更新
   - 若找到更短路徑：
     - dist[v] = dist[u] + w
     - cnt[v] = cnt[u]
     - min_flights[v] = min_flights[u] + 1
     - max_flights[v] = max_flights[u] + 1
   - 若找到等長路徑：
     - cnt[v] = (cnt[v] + cnt[u]) % MOD
     - min_flights[v] = min(min_flights[v], min_flights[u] + 1)
     - max_flights[v] = max(max_flights[v], max_flights[u] + 1)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define ll long long
#define pii pair<ll, int>
const ll INF = 1e18;
const int MOD = 1e9 + 7;
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    int n, m;
    cin >> n >> m;
 
    vector<vector<pair<int, int>>> graph(n + 1);
    for (int i = 0; i < m; ++i) {
        int a, b, c;
        cin >> a >> b >> c;
        graph[a].emplace_back(b, c);
    }
 
    vector<ll> dist(n + 1, INF);
    vector<int> cnt(n + 1, 0);
    vector<int> min_flights(n + 1, INT_MAX);
    vector<int> max_flights(n + 1, 0);
 
    priority_queue<pii, vector<pii>, greater<pii>> pq;
 
    dist[1] = 0;
    cnt[1] = 1;
    min_flights[1] = 0;
    max_flights[1] = 0;
    pq.push({0, 1});
 
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
 
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u];
                min_flights[v] = min_flights[u] + 1;
                max_flights[v] = max_flights[u] + 1;
                pq.push({dist[v], v});
            } else if (dist[u] + w == dist[v]) {
                cnt[v] = (cnt[v] + cnt[u]) % MOD;
                min_flights[v] = min(min_flights[v], min_flights[u] + 1);
                max_flights[v] = max(max_flights[v], max_flights[u] + 1);
            }
        }
    }
 
    cout << dist[n] << " " << cnt[n] << " " << min_flights[n] << " " << max_flights[n] << "\n";
    return 0;
}
```

## Planets Queries I [problem](https://cses.fi/problemset/task/1750)
```markdown
題目: 

- 題目給你一個有向圖（每個節點只有一條邊，指向下一個節點）。
- 需要回答 q 個查詢，每次給 (x, k)，問從節點 x 出發，走 k 步後會到哪個節點。
- 由於 k 可能非常大（高達 10^18），不能暴力模擬。
```
``` markdown
解法 : 

### 1. Binary Lifting 預處理：
   - up[i][j] 表示從節點 i 出發，走 2^j 步後會到哪個節點。
   - up[i][0] 由輸入直接給出。
   - up[i][j] = up[ up[i][j-1] ][j-1]。

---

### 2. 查詢：
   - 對 k 做二進位分解，若第 i 個 bit 為 1，則從 x = up[x][i] 跳過去。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 2e5+5;
const int LOG = 30;
 
int up[MAXN][LOG];
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    int n, q;
    cin >> n >> q;
 
    for (int i = 1; i <= n; ++i) {
        cin >> up[i][0];
    }
 
    // 預處理 up 表
    for (int j = 1; j < LOG; ++j) {
        for (int i = 1; i <= n; ++i) {
            up[i][j] = up[ up[i][j-1] ][j-1];
        }
    }
 
    while (q--) {
        int x;
        long long k; // 注意 k 很大
        cin >> x >> k;
 
        for (int i = 0; i < LOG; ++i) {
            if (k & (1LL << i)) {
                x = up[x][i];
            }
        }
        cout << x << "\n";
    }
}
```

## Planets Queries II [problem](https://cses.fi/problemset/task/1160)
```markdown
題目: 

- 題目給你一個有向圖（functional graph，每個節點恰好只有一條邊指向下一個節點）。
- 需要回答 q 個查詢，每次給 (a, b)，問從節點 a 走到 b 需要的最少步數，如果無法到達，輸出 -1。
```
``` markdown
解法 : 

### 1. 圖的結構分析
- 每個節點只有一條出邊，因此圖由「樹狀分支 + 環」組成。
  - 環上的節點形成 cycle。
  - 不在環上的節點會往下走，最終進入 cycle。

---

### 2. DFS 找環
- 使用 DFS + recursion stack 判斷環:
  - 如果從節點 u 出發，沿著 to[u] 走到尚未訪問的節點，持續 DFS。
  - 如果遇到已在 recursion stack 的節點，表示找到一個 cycle。
  - 記錄每個 cycle 的：
    - `root[node]`: 該節點所在 cycle 的入口節點。
    - `cycle_len[node]`: cycle 的長度。
    - `pos_in_cycle[node]`: 該節點在 cycle 內的位置 (0-based)。
  - 非 cycle 節點先不處理 depth，後續再計算。

---

### 3. 計算 depth
- DFS 完成後，對所有非 cycle 節點計算：
  - depth[u] = depth[to[u]] + 1
  - root[u] = root[to[u]]
  - cycle_len[u] = cycle_len[to[u]]
  - pos_in_cycle[u] = pos_in_cycle[to[u]]

- `depth[u]` 表示節點 u 距離所在 cycle 的距離。

---

### 4. Binary Lifting
- 建立 `up[i][j]`：
up[i][j] = up[ up[i][j-1] ][j-1]

讓我們能夠在 O(log n) 內快速「往前跳」2^j 步。

---

### 5. 查詢 (a → b)
對於每次查詢 (a, b)：
1. 如果 `root[a] != root[b]` → 無法到達，輸出 `-1`。
2. 若 `a` 和 `b` 在同一條樹鏈上：
 - 如果 `depth[a] >= depth[b]`，將 `a` 向上跳 `depth[a]-depth[b]` 步，若能到達 b → 回傳距離
3. 否則：
 - `a` 先走到 cycle (`a = lift(a, depth[a])`)，累加 `depth[a]` 步數。
 - 若 b 仍在樹鏈 (depth[b] > 0) → 無法到達。
 - 否則 b 在 cycle 上 → 計算 cycle 內偏移：
   delta = (pos_in_cycle[b] - pos_in_cycle[a] + cycle_len[a]) % cycle_len[a]
 - 回傳 `depth[a] + delta`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 2e5 + 5;
const int LOG = 30;
 
int n, q;
int to[MAXN];
int up[MAXN][LOG];
int depth[MAXN];
int root[MAXN];
int cycle_len[MAXN];
int pos_in_cycle[MAXN];
bool visited[MAXN], in_stack[MAXN];
 
void dfs(int u, vector<int>& path) {
    visited[u] = true;
    in_stack[u] = true;
    path.push_back(u);
 
    int v = to[u];
    if (!visited[v]) {
        dfs(v, path);
    } else if (in_stack[v]) {
        // 找到環
        int len = 1;
        int idx = path.size() - 1;
        while (path[idx] != v) {
            ++len;
            --idx;
        }
        int offset = 0;
        for (int i = idx; i < (int)path.size(); ++i) {
            root[path[i]] = v;
            depth[path[i]] = 0;
            cycle_len[path[i]] = len;
            pos_in_cycle[path[i]] = offset++;
        }
    }
 
    in_stack[u] = false;
    path.pop_back();
}
 
void compute_depth(int u) {
    int v = to[u];
    if (depth[v] == -1) compute_depth(v);
    if (cycle_len[u] == 0) {
        depth[u] = depth[v] + 1;
        root[u] = root[v];
        cycle_len[u] = cycle_len[v];
        pos_in_cycle[u] = pos_in_cycle[v];
    }
}
 
int lift(int u, long long k) {
    for (int i = 0; i < LOG; ++i) {
        if (k & (1LL << i)) {
            u = up[u][i];
        }
    }
    return u;
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n >> q;
    for (int i = 1; i <= n; ++i) {
        cin >> to[i];
        up[i][0] = to[i];
        depth[i] = -1;
    }
 
    for (int j = 1; j < LOG; ++j) {
        for (int i = 1; i <= n; ++i) {
            up[i][j] = up[up[i][j - 1]][j - 1];
        }
    }
 
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            vector<int> path;
            dfs(i, path);
        }
    }
 
    for (int i = 1; i <= n; ++i) {
        if (depth[i] == -1) compute_depth(i);
    }
 
    while (q--) {
        int a, b;
        cin >> a >> b;
 
        if (root[a] != root[b]) {
            cout << -1 << "\n";
            continue;
        }
 
        int res = 0;
 
        // Case: 在同一條樹鏈上
        if (depth[a] >= depth[b]) {
            int u = lift(a, depth[a] - depth[b]);
            if (u == b) {
                cout << (depth[a] - depth[b]) << "\n";
                continue;
            }
        }
 
        // 走到環上
        res += depth[a];
        a = lift(a, depth[a]);
 
        // 如果 b 在樹上且不在環上，那麼無法到達
        if (depth[b] > 0) {
            cout << -1 << "\n";
            continue;
        }
 
        // b 在同一個環上
        int len = cycle_len[a];
        int delta = (pos_in_cycle[b] - pos_in_cycle[a] + len) % len;
 
        cout << res + delta << "\n";
    }
 
    return 0;
}
```

## Planets Cycles [problem](https://cses.fi/problemset/task/1751)
```markdown
題目: 

- 給定一個 functional graph（每個節點恰好有一條出邊）。
- 對於每個節點 i，要求輸出從 i 出發，最終進入 cycle 並繞完 cycle 的總步數。
- n ≤ 2 × 10^5。
```
``` markdown
解法 : 

### 1. 圖的結構
- 因為每個節點恰有一條出邊，整張圖由「樹狀分支 + cycle」組成：
  - cycle 節點會形成一個閉合環。
  - 其他節點最終會走向某個 cycle。

---

### 2. DFS 找 cycle
- 使用 DFS + recursion stack 判斷環：
  - 如果沿著邊走到還在 stack 內的節點，找到一個 cycle。
  - 記錄：
    - `root[node]`：所在 cycle 的根節點。
    - `cycle_len[node]`：cycle 長度。
    - `pos_in_cycle[node]`：在 cycle 中的位置。
  - cycle 節點的 `depth` 設為 0。

---

### 3. 計算深度
- 非 cycle 節點的 `depth[u]` 表示從節點 u 走到 cycle 入口的距離。
- 使用遞迴：
  - depth[u] = depth[to[u]] + 1
  - root[u] = root[to[u]]
  - cycle_len[u] = cycle_len[to[u]]
  - pos_in_cycle[u] = pos_in_cycle[to[u]]

---

### 4. Binary Lifting 預處理
- `up[i][j]`：從 i 出發走 2^j 步後的節點。
up[i][j] = up[ up[i][j-1] ][j-1]

---

### 5. 計算答案
- 每個節點答案為：
depth[i] + cycle_len[i]
代表先走到 cycle，再繞完整個 cycle。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 2e5 + 5;
const int LOG = 30;
 
int n;
int to[MAXN];
int up[MAXN][LOG];
int depth[MAXN];
int root[MAXN];
int cycle_len[MAXN];
int pos_in_cycle[MAXN];
bool visited[MAXN], in_stack[MAXN];
 
void dfs(int u, vector<int>& path) {
    visited[u] = true;
    in_stack[u] = true;
    path.push_back(u);
 
    int v = to[u];
    if (!visited[v]) {
        dfs(v, path);
    } else if (in_stack[v]) {
        // 找到環
        int len = 1;
        int idx = path.size() - 1;
        while (path[idx] != v) {
            ++len;
            --idx;
        }
        int offset = 0;
        for (int i = idx; i < (int)path.size(); ++i) {
            root[path[i]] = v;
            depth[path[i]] = 0;
            cycle_len[path[i]] = len;
            pos_in_cycle[path[i]] = offset++;
        }
    }
 
    in_stack[u] = false;
    path.pop_back();
}
 
void compute_depth(int u) {
    int v = to[u];
    if (depth[v] == -1) compute_depth(v);
    if (cycle_len[u] == 0) {
        depth[u] = depth[v] + 1;
        root[u] = root[v];
        cycle_len[u] = cycle_len[v];
        pos_in_cycle[u] = pos_in_cycle[v];
    }
}
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
 
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        cin >> to[i];
        up[i][0] = to[i];
        depth[i] = -1;
    }
 
    for (int j = 1; j < LOG; ++j) {
        for (int i = 1; i <= n; ++i) {
            up[i][j] = up[up[i][j - 1]][j - 1];
        }
    }
 
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            vector<int> path;
            dfs(i, path);
        }
    }
 
    for (int i = 1; i <= n; ++i) {
        if (depth[i] == -1) compute_depth(i);
    }
 
    for (int i = 1; i <= n; ++i) {
        cout << depth[i] + cycle_len[i] << " ";
    }
    cout << "\n";
 
    return 0;
}
```

## Road Reparation [problem](https://cses.fi/problemset/task/1675)
```markdown
題目: 

- 給定一個含有 n 個節點、m 條邊的無向加權圖。
- 需要計算最小生成樹 (MST) 的總成本。
- 如果圖不連通，則輸出 "IMPOSSIBLE"。
```
``` markdown
解法 : 

### 1. Kruskal 演算法
- Kruskal 是經典的 MST 演算法：
  1. 將所有邊依照權重 w 升序排序。
  2. 使用 Union-Find (Disjoint Set Union, DSU) 判斷兩個節點是否已連通。
  3. 若尚未連通，則將此邊加入 MST，並合併集合。
  4. 重複直到 MST 中邊數 = n - 1。

---

### 2. Union-Find
- `find(x)`：找出節點 x 所屬的集合代表，使用路徑壓縮加速。
- `unite(x, y)`：
  - 若兩個集合不同，合併並回傳 `true`。
  - 否則回傳 `false`。

---

### 3. 判斷是否連通
- 若最終選到的邊數小於 `n - 1`，表示圖不連通 → 印出 `IMPOSSIBLE`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
const int MAXN = 1e5 + 5;
 
struct UnionFind {
    vector<int> parent, rank;
 
    UnionFind(int n) {
        parent.resize(n + 1);
        rank.assign(n + 1, 0);
        for (int i = 1; i <= n; ++i) parent[i] = i;
    }
 
    int find(int x) {
        if (x != parent[x]) parent[x] = find(parent[x]);
        return parent[x];
    }
 
    bool unite(int x, int y) {
        x = find(x);
        y = find(y);
        if (x == y) return false;
        if (rank[x] < rank[y]) swap(x, y);
        parent[y] = x;
        if (rank[x] == rank[y]) rank[x]++;
        return true;
    }
};
 
int main() {
    fastio;
 
    int n, m;
    cin >> n >> m;
 
    vector<tuple<LL, int, int>> edges;
    for (int i = 0; i < m; ++i) {
        int a, b;
        LL w;
        cin >> a >> b >> w;
        edges.push_back({w, a, b});
    }
 
    sort(edges.begin(), edges.end());
 
    UnionFind uf(n);
    LL mst_cost = 0;
    int edges_used = 0;
 
    for (auto &[w, u, v] : edges) {
        if (uf.unite(u, v)) {
            mst_cost += w;
            edges_used++;
        }
    }
 
    if (edges_used == n - 1) {
        cout << mst_cost << "\n";
    } else {
        cout << "IMPOSSIBLE\n";
    }
 
    return 0;
}
```

## Road Construction [problem](https://cses.fi/problemset/task/1676)
```markdown
題目: 

- 給定一個 n 個節點、m 個操作的動態連通性問題。
- 每次操作輸入一條邊 (a, b)，將 a 和 b 合併。
- 每次合併後，輸出：
  1. 目前圖中有幾個連通元件。
  2. 目前最大的連通元件大小。
```
``` markdown
解法 : 

### 1. Union-Find (Disjoint Set Union, DSU)
- `parent[x]`：記錄節點 x 的代表節點。
- `rank[x]`：在這裡不代表「樹高」，而是記錄「該集合的大小」。
- `rankCnt`：記錄目前連通元件的數量。
- `maxRank`：記錄目前最大的集合大小。

---

### 2. 合併 (unite)
1. 找到兩個節點的代表。
2. 若不同集合：
   - 將小集合合併到大集合。
   - 更新集合大小 `rank[x] += rank[y]`。
   - 更新 `maxRank` 和 `rankCnt`。

---

### 3. 每次輸出
- 每次合併操作後，直接輸出：
  - `rankCnt`：當前連通元件數。
  - `maxRank`：當前最大集合大小。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF LL(1e15)
#define MOD LL((1e9) + 7)
#define SIZE LL(1e5)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
const int MAXN = 1e5 + 5;

struct UnionFind {
    int maxRank, rankCnt;
    vector<int> parent, rank;
 
    UnionFind(int n) {
        parent.resize(n + 1);
        rank.assign(n + 1, 1);
        for (int i = 1; i <= n; ++i) parent[i] = i;
        maxRank = 1;
        rankCnt = n;
    }
 
    int find(int x) {
        if (x != parent[x]) parent[x] = find(parent[x]);
        return parent[x];
    }
 
    bool unite(int x, int y) {
        x = find(x);
        y = find(y);
        if (x == y) return false;
        if (rank[x] < rank[y]) swap(x, y);
        parent[y] = x;
        rank[x] += rank[y];
        rankCnt--;
        maxRank = max(maxRank, rank[x]);
        return true;
    }
};
 
int main() {
    fastio;
 
    int n, m;
    cin >> n >> m;
 
    UnionFind uf(n);
    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;
        uf.unite(a, b);
        cout << uf.rankCnt << ' ' << uf.maxRank << '\n';
    }
 
    return 0;
}
```

## Flight Routes Check [problem](https://cses.fi/problemset/task/1682)
```markdown
題目: 

- 給定一個 n 個節點、m 條邊的有向圖。
- 判斷此圖是否「強連通」：
  1. 從節點 1 是否能到達所有節點？
  2. 所有節點是否能到達節點 1？
- 若圖不強連通，需輸出 "NO" 並給出一對 (u, v)，表示 u 無法到達 v。
- 若圖強連通，輸出 "YES"。
```
``` markdown
解法 : 

### 1. 兩次 DFS
- 由於圖強連通的條件是：
  - 1 可以到所有節點。
  - 所有節點可以到 1。
- 我們可以：
  1. 在原圖 `G` 上從 1 進行 DFS。
     - 若有節點沒被訪問 → `1 無法到達該節點` → 輸出 "NO" 與 (1, i)。
  2. 在反圖 `RG` (所有邊反向) 上從 1 進行 DFS。
     - 若有節點沒被訪問 → `該節點無法到達 1` → 輸出 "NO" 與 (i, 1)。

---

### 2. 反圖 (Reverse Graph)
- 反圖的構建：
- RG[b].push_back(a)
- 表示若有 a → b，則在反圖有 b → a。

---

### 3. 強連通條件
- 若兩次 DFS 都通過，圖為強連通 → 輸出 "YES"。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define LL long long
const int MAXN = 1e5 + 5;
 
vector<vector<int>> G(MAXN), RG(MAXN);  // 正圖、反圖
vector<bool> visited(MAXN);
int n, m;
 
void dfs(int u, const vector<vector<int>>& graph) {
    visited[u] = true;
    for (int v : graph[u]) {
        if (!visited[v]) dfs(v, graph);
    }
}
 
int main() {
    fastio;
    cin >> n >> m;
 
    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        RG[b].push_back(a);
    }
 
    // Check if 1 can reach all others
    fill(visited.begin(), visited.begin() + n + 1, false);
    dfs(1, G);
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            cout << "NO\n";
            cout << 1 << ' ' << i << '\n';
            return 0;
        }
    }
 
    // Check if all can reach 1
    fill(visited.begin(), visited.begin() + n + 1, false);
    dfs(1, RG);
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            cout << "NO\n";
            cout << i << ' ' << 1 << '\n';
            return 0;
        }
    }
 
    cout << "YES\n";
    return 0;
}
```

## Planets and Kingdoms [problem](https://cses.fi/problemset/task/1683)
```markdown
題目: 

- 給定一個 n 個節點、m 條邊的有向圖。
- 需要將圖分解為強連通分量 (SCC, Strongly Connected Components)。
- 要輸出：
  1. SCC 的總數。
  2. 每個節點所屬的 SCC 編號。
```
``` markdown
解法 : 

### 1. 強連通分量 (SCC)
- 若圖中兩個節點 u 和 v 互相可達，則 u 和 v 在同一個 SCC。
- 對於 DAG，每個 SCC 可以被視為一個「超節點」。

---

### 2. Kosaraju 演算法
1. **第一次 DFS (正向圖)**：
   - 依照 finish time（結束時間）順序記錄節點。
   - 採用 post-order，將節點壓入 `order`。

2. **第二次 DFS (反向圖)**：
   - 將 `order` 反轉。
   - 依序從 `order` 中取節點，若未訪問過則進行 DFS。
   - 每次 DFS 掃描到的所有節點屬於同一個 SCC。

3. **指派 SCC ID**：
   - 每當進行第二次 DFS，就建立一個新的 SCC 編號，並將所有訪問到的節點指派到該 SCC。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define LL long long
const int MAXN = 1e5 + 5;
 
vector<vector<int>> G(MAXN), RG(MAXN);  // 正圖、反圖
vector<bool> visited(MAXN);
vector<int> order, scc_id(MAXN);
int n, m, scc_cnt = 0;
 
void dfs1(int u) {
    visited[u] = true;
    for (int v : G[u]) {
        if (!visited[v]) dfs1(v);
    }
    order.push_back(u);
}
 
void dfs2(int u, int id) {
    scc_id[u] = id;
    visited[u] = true;
    for (int v : RG[u]) {
        if (!visited[v]) dfs2(v, id);
    }
}
 
int main() {
    fastio;
    cin >> n >> m;
 
    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        RG[b].push_back(a);
    }
 
    // Step 1: 正向圖 DFS 記錄 finish time
    fill(visited.begin(), visited.begin() + n + 1, false);
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) dfs1(i);
    }
 
    // Step 2: 反向圖 DFS 找 SCC
    fill(visited.begin(), visited.begin() + n + 1, false);
    reverse(order.begin(), order.end());
    for (int u : order) {
        if (!visited[u]) {
            ++scc_cnt;
            dfs2(u, scc_cnt);
        }
    }
 
    // 輸出
    cout << scc_cnt << '\n';
    for (int i = 1; i <= n; ++i) {
        cout << scc_id[i] << ' ';
    }
    cout << '\n';
 
    return 0;
}
```

## Giant Pizza [problem](https://cses.fi/problemset/task/1684)
```markdown
題目: 

- 給定 n 個變數，每個變數可為 `+`（true）或 `-`（false）。
- 給定 m 個條件，每個條件為 `(x 是 + 或 -) ∨ (y 是 + 或 -)`。
- 判斷是否能滿足所有條件，若能輸出每個變數的指派結果，否則輸出 "IMPOSSIBLE"。
```
``` markdown
解法 : 

### 1. 2-SAT 問題
- 2-SAT 是可在 `O(n + m)` 內解的布林可滿足性問題。
- 每個變數有兩種狀態：
  - `x` 為真（`2*x`）
  - `x` 為假（`2*x+1`）
- 每個條件 `(A ∨ B)` 可轉換為兩個 implication：
¬A → B
¬B → A

---

### 2. 建立圖
- 我們建立一張 implication graph：
- `G`：正向圖（implication）。
- `RG`：反向圖（反向邊）。

---

### 3. Kosaraju 求 SCC
- 進行兩次 DFS：
1. **第一次 DFS**：在 `G` 上記錄拓樸結束順序。
2. **第二次 DFS**：在 `RG` 上依照逆序進行，標記每個節點的 SCC。

- 若某變數的正負兩個節點在同一 SCC，表示矛盾 → 無解。

---

### 4. 指派值
- 若 `comp[x] > comp[¬x]`，則 `x = true`，否則 `x = false`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
 
// 2-SAT 模板區
struct TwoSAT {
    int n;
    vector<vector<int>> G, RG;
    vector<int> comp, order;
    vector<bool> used;
 
    TwoSAT(int vars) {
        n = vars;
        G.resize(2 * n);
        RG.resize(2 * n);
        comp.assign(2 * n, 0);
        used.assign(2 * n, false);
    }
 
    int var(int x, bool isTrue) {
        return 2 * x + (isTrue ? 0 : 1); // true → 2x, false → 2x+1
    }
 
    int neg(int x) {
        return x ^ 1;
    }
 
    void add_or(int a, bool aTrue, int b, bool bTrue) {
        int A = var(a, aTrue);
        int B = var(b, bTrue);
        G[neg(A)].push_back(B);
        G[neg(B)].push_back(A);
        RG[B].push_back(neg(A));
        RG[A].push_back(neg(B));
    }
 
    void dfs1(int u) {
        used[u] = true;
        for (int v : G[u]) if (!used[v]) dfs1(v);
        order.push_back(u);
    }
 
    void dfs2(int u, int label) {
        comp[u] = label;
        for (int v : RG[u]) if (!comp[v]) dfs2(v, label);
    }
 
    bool solve(vector<bool>& assignment) {
        int N = 2 * n;
        order.clear();
        fill(used.begin(), used.end(), false);
        fill(comp.begin(), comp.end(), 0);
 
        for (int i = 0; i < N; ++i)
            if (!used[i]) dfs1(i);
        int label = 1;
        for (int i = N - 1; i >= 0; --i)
            if (!comp[order[i]]) dfs2(order[i], label++);
 
        assignment.resize(n);
        for (int i = 0; i < n; ++i) {
            if (comp[2 * i] == comp[2 * i + 1]) return false;
            assignment[i] = comp[2 * i] > comp[2 * i + 1];
        }
        return true;
    }
};
 
// 主程式
int main() {
    fastio;
    int m, n;
    cin >> m >> n;
 
    TwoSAT solver(n);
    for (int i = 0; i < m; ++i) {
        char c1, c2;
        int a, b;
        cin >> c1 >> a >> c2 >> b;
        --a, --b;
        bool aTrue = (c1 == '+');
        bool bTrue = (c2 == '+');
        solver.add_or(a, aTrue, b, bTrue);  // 加入 A ∨ B 條件
    }
 
    vector<bool> assignment;
    if (solver.solve(assignment)) {
        for (bool val : assignment) {
            cout << (val ? '+' : '-') << ' ';
        }
        cout << '\n';
    } else {
        cout << "IMPOSSIBLE\n";
    }
    return 0;
}
```

## Coin Collector [problem](https://cses.fi/problemset/task/1686)
```markdown
題目: 

- 給定一個有向圖，每個節點都有一個「金幣數值」。
- 你可以從任意節點出發，沿著邊走（不能回頭），收集你經過的所有節點的金幣。
- 每個節點只能走一次（因為不能回到先前的 SCC）。
- 求最多可以收集多少金幣。
```
``` markdown
解法 : 

### 1. 把圖縮成 DAG（SCC 強連通分量）
- 因為強連通分量（SCC）內可以互相到達 → 可視為一個 super node。
- 使用 **Kosaraju 演算法**：
  - `dfs1`：記錄 finish time（後序訪問順序）。
  - `dfs2`：在反圖上跑 DFS，標記每個節點屬於哪個 SCC。
  - 同時累加每個 SCC 的金幣總和。

---

### 2. 建立 SCC DAG
- 將原圖的邊對應到 SCC DAG 上：
  - 若邊 `u → v` 中，`u` 和 `v` 屬於不同 SCC，則連一條邊 `comp[u] → comp[v]`。

---

### 3. DAG DP
- 對於縮圖 DAG 執行 Topological Sort + DP。
- `dp[u]` 表示在 DAG 上從某個入點走到 SCC `u` 為止，所能收集到的最大金幣總和。
- 初始值為該 SCC 自身金幣總和。
- 對於每條邊 `u → v`：
dp[v] = max(dp[v], dp[u] + scc_value[v])
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
 
const int N = 1e5 + 5;
 
int n, m;
ll coins[N];
vector<int> g[N], rg[N];
 
// Kosaraju
vector<int> order;
bool vis[N];
int comp[N];
ll scc_value[N];
vector<int> dag[N];
 
void dfs1(int u) {
    vis[u] = true;
    for (int v : g[u])
        if (!vis[v]) dfs1(v);
    order.push_back(u);
}
 
void dfs2(int u, int cid) {
    comp[u] = cid;
    scc_value[cid] += coins[u];
    for (int v : rg[u])
        if (comp[v] == -1) dfs2(v, cid);
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) cin >> coins[i];
    for (int i = 0; i < m; ++i) {
        int a, b; cin >> a >> b;
        g[a].push_back(b);
        rg[b].push_back(a);
    }
 
    // Step 1: Kosaraju - forward dfs
    for (int i = 1; i <= n; ++i)
        if (!vis[i]) dfs1(i);
 
    // Step 2: Kosaraju - backward dfs
    memset(comp, -1, sizeof(comp));
    int cid = 0;
    reverse(order.begin(), order.end());
    for (int u : order)
        if (comp[u] == -1) dfs2(u, cid++);
 
    // Step 3: build DAG
    for (int u = 1; u <= n; ++u) {
        for (int v : g[u]) {
            int cu = comp[u], cv = comp[v];
            if (cu != cv) dag[cu].push_back(cv);
        }
    }
 
    // Step 4: DAG DP (topo sort)
    vector<ll> dp(cid);
    vector<int> indeg(cid, 0);
    for (int u = 0; u < cid; ++u) {
        for (int v : dag[u]) indeg[v]++;
    }
 
    queue<int> q;
    for (int u = 0; u < cid; ++u) {
        dp[u] = scc_value[u];
        if (indeg[u] == 0) q.push(u);
    }
 
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : dag[u]) {
            if (--indeg[v] == 0) q.push(v);
            dp[v] = max(dp[v], dp[u] + scc_value[v]);
        }
    }
 
    cout << *max_element(dp.begin(), dp.end()) << "\n";
    return 0;
}
```

## Mail Delivery [problem](https://cses.fi/problemset/task/1691)
```markdown
題目: 

- 給定一個無向圖，有 n 個節點、m 條邊。
- 問是否存在一條 **Eulerian trail**（歐拉路徑）或 **Eulerian circuit**（歐拉環）：
  - 路徑需經過每條邊一次且僅一次。
  - 若存在，輸出任意一條合法路徑。
  - 若不存在，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. Eulerian Path / Circuit 條件（無向圖）
- **Eulerian circuit（回路）**：
  - 所有節點的度數都是偶數。
- **Eulerian trail（路徑）**（非本題需求）：
  - 恰有兩個節點度數為奇數，其餘為偶數。
- 本題要求遍歷所有邊一次，因此只有當所有度數皆為偶數，且圖連通時，才有 Eulerian circuit。

---

### 2. Hierholzer's Algorithm（找歐拉環）
- 遞迴方式：
  - 每次從目前節點 u 沿著未使用的邊往下走，走完所有邊後把節點加入答案。
- 最後路徑長度應為 m+1（m 條邊，走 m 步）。

---

### 3. 邊記錄技巧
- 每條邊編號：存入 `g[u]` 與 `g[v]` 時都記錄其編號 `i`。
- 為了避免重複使用相同邊，用 `used_edge[i]` 標記是否走過。

---

### 4. 邊界與錯誤情況處理
- 有任一節點度數為奇數 → 直接輸出 `IMPOSSIBLE`
- 若走完後路徑長度不是 m+1 → 圖不連通或未覆蓋所有邊 → `IMPOSSIBLE`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MAXN = 1e5+5;
 
vector<pair<int,int>> g[MAXN];
vector<int> path;
bool used_edge[MAXN*2];
int deg[MAXN];
int n, m;
 
void dfs(int u) {
    while (!g[u].empty()) {
        auto [v, id] = g[u].back();
        g[u].pop_back();
        if (used_edge[id]) continue;
        used_edge[id] = true;
        dfs(v);
    }
    path.push_back(u);
}
 
int main() {
    cin >> n >> m;
    for (int i = 0; i < m; ++i) {
        int u,v; cin>>u>>v;
        g[u].emplace_back(v,i);
        g[v].emplace_back(u,i);
        deg[u]++;
        deg[v]++;
    }
 
    for (int i = 1; i <= n; ++i) {
        if (deg[i] % 2 != 0) {
            cout << "IMPOSSIBLE\n";
            return 0;
        }
    }
 
    dfs(1);
 
    if (path.size() != m+1) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
 
    reverse(path.begin(), path.end());
    for (int u : path) cout << u << " ";
    cout << "\n";
}
```

## De Bruijn Sequence [problem](https://cses.fi/problemset/task/1691)
```markdown
題目: 

- 給定一個正整數 `n`，請輸出一個長度為 `2^n + n - 1` 的字串，使得所有長度為 `n` 的 01 字串恰好
  出現一次。
- 這稱為 **De Bruijn sequence**（德布魯因序列）。
```
``` markdown
解法 : 

### 1. 問題轉化為圖論：De Bruijn Graph
- 我們可以把所有 `n` 位元的 01 字串視為一個有向圖中的邊。
- 節點為長度 `n - 1` 的字串，共 `2^(n-1)` 個。
- 一條邊表示從某個 `n-1` 字串加上 0 或 1，轉移到下一個節點（尾端 n-1 bits）。
- 例如：
n = 3 時:
節點: 00, 01, 10, 11
邊: 000, 001, 010, ..., 111
例如 001 表示從 00 加 1 → 到 01

---

### 2. Eulerian Path 解法（Hierholzer 演算法）
- 這個圖是一張平衡有向圖（每個節點入度 = 出度 = 2），存在歐拉回路。
- 我們只要找一條 Eulerian Circuit（每條邊走一次）即可得到 De Bruijn sequence。
- 使用 DFS 實作：
- 每個節點最多會走出兩條邊（加上 0 或 1）。
- 每走一條邊，就記錄對應的 bit。
- 最後將結果 reverse（因為 DFS 是後序處理）並補上開頭的 n-1 個 0。

---

### 3. 實作說明
- `vis[edge]`: 記錄是否走過這條邊，總共有 `2^n` 條邊。
- `edge = (u << 1) | b`: 將目前節點 `u` 左移一位並加上 bit `b`（模擬下一個邊）。
- `edge & ((1 << (n-1)) - 1)`: 取得新的節點（n-1 長度），用來遞迴。
- 最終輸出為一條長度 `2^n + n - 1` 的 01 字串，包含所有 n-bit 組合。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int n;
string res;
vector<bool> vis;
 
void dfs(int u) {
    for (int b = 0; b < 2; ++b) {
        int edge = (u << 1) | b;
        if (!vis[edge]) {
            vis[edge] = true;
            dfs(edge & ((1 << (n-1)) - 1));
            res += (b + '0');
        }
    }
}
 
int main() {
    cin >> n;
    int m = 1 << n;
    vis.assign(m, false);
 
    dfs(0);
    reverse(res.begin(), res.end());
    cout << string(n-1, '0') + res << "\n";
}
```

## Teleporters Path [problem](https://cses.fi/problemset/task/1693)
```markdown
題目: 

- 給定一個有向圖，n 個節點、m 條邊。
- 請輸出一條從節點 1 到節點 n 的路徑，使得 **每條邊剛好使用一次**（不能重複、不能漏），也就是一
  條 **Eulerian path**（歐拉路徑）。
- 如果無法達成，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. Eulerian Path 條件（有向圖）
在有向圖中，存在一條 Eulerian path（歐拉路徑）的條件是：

- **最多只存在一個起點 u，使得 out_deg[u] = in_deg[u] + 1**（起點）
- **最多只存在一個終點 v，使得 in_deg[v] = out_deg[v] + 1**（終點）
- 所有其他節點的 in_deg = out_deg

→ 在本題中，題目指定起點為 1、終點為 n，所以需檢查：

- `out_deg[1] == in_deg[1] + 1`
- `in_deg[n] == out_deg[n] + 1`
- 所有其他點需滿足 `in_deg[i] == out_deg[i]`，對 2 ≤ i ≤ n-1

---

### 2. 建圖與遍歷技巧

- 我們儲存邊 `(u, v)` 在 `edges` 陣列，圖的鄰接表 `g[u]` 存的是該邊的編號。
- 在 DFS 中走邊時，用邊的 index 找到對應的 v，再遞迴。

---

### 3. Hierholzer's Algorithm 尋找 Eulerian Path

- 遞迴 DFS，每次將走過的邊移除。
- 後序加入 path，最後反轉得到正確路徑。

---

### 4. 判斷是否成功

- 若走出來的 `path` 長度不是 `m + 1` → 不可能
- 若走出來的 `path` 開頭不是 `n`（因為最後從 1 出發，n 結束，後序會把 n 加在最後）→ 不可能
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 1e5+5;
vector<int> g[N];
vector<pair<int,int>> edges;
vector<int> path;
int in_deg[N], out_deg[N];
int n, m;
 
void dfs(int u) {
    while (!g[u].empty()) {
        int idx = g[u].back();
        g[u].pop_back();
        int v = edges[idx].second;
        dfs(v);
    }
    path.push_back(u);
}
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n >> m;
 
    for (int i = 0; i < m; ++i) {
        int u, v; cin >> u >> v;
        edges.emplace_back(u, v);
        g[u].push_back(i);
        out_deg[u]++;
        in_deg[v]++;
    }
 
    // 檢查 Eulerian path 條件
    bool ok = true;
    if (out_deg[1] != in_deg[1] + 1) ok = false;
    if (in_deg[n] != out_deg[n] + 1) ok = false;
    for (int i = 2; i < n; ++i) {
        if (in_deg[i] != out_deg[i]) ok = false;
    }
 
    if (!ok) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
 
    dfs(1);
 
    // 檢查是否剛好用完所有邊，且最後停在 n
    if (path.size() != m + 1 || path.front() != n) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
 
    reverse(path.begin(), path.end());
    for (int u : path) cout << u << " ";
    cout << "\n";
}
```

## Hamiltonian Flights [problem](https://cses.fi/problemset/task/1690)
```markdown
題目: 

- 給定一張 n 個點、m 條邊的有向圖，求從節點 1 出發、走遍每個節點一次且只一次，並以節點 n 結束
  的 **Hamiltonian path** 總數。
- 多重邊允許，輸出結果對 $10^9 + 7$ 取模。
```
``` markdown
解法 : 

### 1. 狀態定義：Bitmask DP
- 設 `dp[mask][u]` 為：
  - 「當目前走過的節點集合為 `mask`，並且最後一站在節點 `u` 時的總路徑數」。
- mask 為 $[0, 2^n)$ 的整數，代表 visited set。
- 轉移方式：
  - 對於每一個點 `u`，遍歷其出邊 `(u → v)`，如果 `v` 尚未被造訪（`mask & (1 << v) == 0`）：
    dp[mask | (1<<v)][v] += dp[mask][u] * 邊數(u, v)

---

### 2. 多重邊處理技巧
- 題目允許重邊，因此每對 `(u, v)` 可能有多條邊。
- 先統計邊 `(u, v)` 出現幾次，用 `unordered_map<int, int>` 儲存 `cnt[u*n + v]`。
- 再重新建圖，將重邊合併為一筆，並存邊權 `c`（重複次數）。

---

### 3. 初始條件與目標
- 起點為節點 0（即原題的節點 1）
- `dp[1 << 0][0] = 1`：只造訪 0 的情況初始化為 1。
- 最終答案為：`dp[(1<<n)-1][n-1]` → 所有節點都走過、且結尾為節點 n 的情況。

---

### 4. 複雜度分析
- 狀態數為 `O(n * 2^n)`，最多約 `20 × 2^20 ≈ 20M`，可以接受。
- 每個狀態最多轉移到 n 個點。
- 適合 n ≤ 20 的 Bitmask DP 經典範例。

---

### 5. 關鍵技巧
- 因為 m 很大（高達 2e5），需要將多重邊「合併為邊權」，否則圖的鄰接表會太長，導致 TLE。
- 使用 `unordered_map<int,int>` 快速計數邊 `(u,v)` 的出現次數是必要的優化。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9+7;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n, m;
    cin >> n >> m;

    vector<vector<pair<int,int>>> g(n);
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        g[u].emplace_back(v, 1);  // 初始加入，每條邊權為 1
    }

    // 將重邊合併
    unordered_map<int,int> cnt;
    for (int u = 0; u < n; ++u) {
        for (auto &e : g[u]) {
            cnt[u*n + e.first] += 1;
        }
    }

    for (int u = 0; u < n; ++u) g[u].clear();
    for (auto &[key, val] : cnt) {
        int u = key / n, v = key % n;
        g[u].emplace_back(v, val);
    }

    vector<vector<int>> dp(1<<n, vector<int>(n, 0));
    dp[1][0] = 1;  // 起點為節點 0（也就是原題的節點 1）

    for (int mask = 1; mask < (1<<n); ++mask) {
        for (int u = 0; u < n; ++u) {
            if (!(mask & (1<<u)) || dp[mask][u] == 0) continue;

            for (auto &[v, c] : g[u]) {
                if ((mask & (1<<v)) == 0) {
                    dp[mask | (1<<v)][v] = (dp[mask | (1<<v)][v] + 1LL * dp[mask][u] * c) % MOD;
                }
            }
        }
    }

    cout << dp[(1<<n)-1][n-1] << "\n";  // 所有節點都走過，終點是 n-1（即節點 n）
}
```

## Knight's Tour [problem](https://cses.fi/problemset/task/1689)
```markdown
題目: 

- 給定一個 8×8 的棋盤，與起始位置 `(sx, sy)`（從 1 開始編號）。
- 要求找到一條 **騎士巡邏路徑**（Knight's Tour），使得從起點出發，**不重複地**走訪所有 64 格
  正好一次。
- 輸出最後的棋盤，棋盤上每一格是該格被訪問的順序（1~64）。
```
``` markdown
解法 : 

### 1. 問題性質
- 這是經典的 **Knight’s Tour Problem**。
- 騎士走法：日字型移動，共 8 種方向。
- 要求構造一條 Hamiltonian path 長度為 64 的路徑（訪問每格一次）。
- 因為搜尋空間極大，需搭配**啟發式剪枝**。

---

### 2. Warnsdorff’s Rule（優先走剩餘出路最少的格子）
- 每次從當前位置出發，檢查 8 個合法方向：
  - 若某方向可行（未走過且在棋盤內），計算該格可繼續走的候選數（degree）。
- 優先遞迴到 degree 最小的下一格。
- 這個策略可以大幅降低分支數，對 8×8 棋盤幾乎總能找到一條巡邏路。

---

### 3. 搜尋與回溯實作說明

- `dfs(x, y, cnt)`：
  - 表示從 (x, y) 出發，第 `cnt` 步。
  - 若走滿 64 步 → 回傳成功。
  - 否則依據 Warnsdorff’s Rule 排序所有合法移動，遞迴下一步。
  - 若失敗，清除標記回溯。

- `board[x][y]`：
  - 表示該格是否訪問過（>0 即為第幾步走到的）。
- `path`：
  - 儲存整條走法的順序，最後輸出用。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int dx[] = {2,1,-1,-2,-2,-1,1,2};
int dy[] = {1,2,2,1,-1,-2,-2,-1};
 
int board[8][8];
vector<pair<int,int>> path;
 
bool inside(int x,int y) {
    return x>=0 && x<8 && y>=0 && y<8;
}
 
bool dfs(int x,int y,int cnt) {
    board[x][y] = cnt;
    path.emplace_back(x,y);
 
    if (cnt == 64) return true;
 
    vector<pair<int,pair<int,int>>> moves;
 
    for (int d=0;d<8;++d) {
        int nx = x+dx[d], ny = y+dy[d];
        if (!inside(nx,ny) || board[nx][ny]) continue;
 
        int deg = 0;
        for (int dd=0;dd<8;++dd) {
            int nnx = nx+dx[dd], nny = ny+dy[dd];
            if (inside(nnx,nny) && !board[nnx][nny]) ++deg;
        }
        moves.push_back({deg,{nx,ny}});
    }
 
    sort(moves.begin(),moves.end());
 
    for (auto &m : moves) {
        int nx = m.second.first, ny = m.second.second;
        if (dfs(nx,ny,cnt+1)) return true;
    }
 
    board[x][y] = 0;
    path.pop_back();
    return false;
}
 
int main() {
    int sx,sy;
    cin >> sy >> sx;
    --sx,--sy;
 
    dfs(sx,sy,1);
 
    int ans[8][8] = {};
    for (int i=0; i<path.size(); ++i) {
        ans[path[i].first][path[i].second] = i+1;
    }
 
    for (int i=0; i<8; ++i) {
        for (int j=0; j<8; ++j) {
            cout << setw(2) << ans[i][j] << " ";
        }
        cout << "\n";
    }
}
```

## Download Speed [problem](https://cses.fi/problemset/task/1694)
```markdown
題目: 

- 給定一張有向圖，有 n 個節點與 m 條邊。
- 每條邊有一個容量 `c`。
- 問從節點 `1` 到節點 `n` 的最大流是多少。
- 輸出最大流。
```
``` markdown
解法 : 

### 1. 使用 Dinic's Algorithm 求最大流
Dinic 是一種高效的最大流演算法，適合邊多、容量大（如本題）：

- **時間複雜度**：`O(E√V)`（對於 unit capacity），對於本題，因為邊數 ≪ 容量，所以比 
  Edmonds-Karp 快非常多。

---

### 2. 演算法流程

#### Step 1: 建立圖結構
- `g[u]` 是從節點 `u` 出發的邊集合。
- 每條邊記錄：`to`（終點）、`rev`（反向邊在對方 adjacency list 的位置）、`cap`（容量）。
- 加邊時同時加上反向邊（容量設為 0）。

#### Step 2: 分層圖建構（BFS）
- 從 source 節點開始進行 BFS。
- `level[v]` 表示節點 `v` 在 BFS 層數，用來限制後續 DFS 的增廣邊必須為層數嚴格遞增。

#### Step 3: 增廣路搜尋（DFS）
- 在分層圖上跑 DFS 尋找從 `s` 到 `t` 的可行路徑。
- 每找到一條就更新正向與反向邊的容量。
- 使用 `iter[v]` 記錄每個節點當前走到哪條邊，避免重複掃描。

#### Step 4: 重複執行直到 BFS 找不到 t 為止

---

### 3. 注意實作細節：

- 容量為 0 的邊不再進行 DFS。
- `dfs()` 返回的是實際能流動的 flow（取 min）。
- 用 `LLONG_MAX` 作為初始流量上限，避免溢位。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
struct Edge {
    int to, rev;
    long long cap;
};
 
class MaxFlow {
    int n;
    vector<vector<Edge>> g;
    vector<int> level, iter;
 
public:
    MaxFlow(int n) : n(n), g(n), level(n), iter(n) {}
 
    void add_edge(int from, int to, long long cap) {
        g[from].push_back({to, (int)g[to].size(), cap});
        g[to].push_back({from, (int)g[from].size()-1, 0}); // 反向邊
    }
 
    void bfs(int s) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (auto &e : g[v]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[v] + 1;
                    q.push(e.to);
                }
            }
        }
    }
 
    long long dfs(int v, int t, long long upTo) {
        if (v == t) return upTo;
        for (int &i = iter[v]; i < g[v].size(); ++i) {
            Edge &e = g[v][i];
            if (e.cap > 0 && level[v] < level[e.to]) {
                long long d = dfs(e.to, t, min(upTo, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    g[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }
 
    long long max_flow(int s, int t) {
        long long flow = 0;
        while (true) {
            bfs(s);
            if (level[t] < 0) break;
            fill(iter.begin(), iter.end(), 0);
            long long f;
            while ((f = dfs(s, t, LLONG_MAX)) > 0) {
                flow += f;
            }
        }
        return flow;
    }
};
 
int main() {
    int n, m;
    cin >> n >> m;
 
    MaxFlow mf(n);
 
    for (int i = 0; i < m; ++i) {
        int u, v, c;
        cin >> u >> v >> c;
        --u, --v; // 題目從 1 開始編號，轉為 0-based
        mf.add_edge(u, v, c);
    }
 
    cout << mf.max_flow(0, n-1) << "\n";  // 從節點 1 到 n（轉為 0 ~ n-1）
}
```

## Police Chase [problem](https://cses.fi/problemset/task/1695)
```markdown
題目: 

- 給定一張無向圖，有 n 個節點、m 條邊
- 找出最少要切斷幾條邊，才能讓 1 不能再連到 n，並輸出這些邊。
```
``` markdown
解法 : 

### 1. 建模為最大流問題
- 將每條**無向邊** `(u, v)` 轉換為兩條**有向邊** `u → v` 和 `v → u`，容量皆為 1。
- 這樣就可以使用 Dinic’s Algorithm 求出最大流。
- 因為每條邊容量為 1，最大流也等於最小割邊數。

---

### 2. 求最小割邊集（Min-Cut Set）
- 在最大流完成後，從 source 節點（節點 1）出發，做 BFS or DFS 只走**剩餘容量 > 0** 的邊，標記
  可達的節點集合。
- 所有從 **可達集合**（S）出發，連到 **不可達集合**（T） 的邊 `(u, v)`，即為最小割邊。

---

### 3. 輸出邊
- 因為每條無向邊被拆成兩條單向邊，所以只要在最小割邊判斷中輸出一次即可。
- 最小割邊數 = 最大流值 → 只需輸出前 `flow` 條滿足條件的邊。

---

### 4. 時間複雜度
- Dinic’s Algorithm：`O(E√V)`（這裡每邊拆成兩邊）
- 總體足夠處理 $n \leq 500, m \leq 10^4$

---

### 5. 額外註解
- `min_cut(s)` 回傳一個布林陣列，表示哪些節點在最大流結束後仍可從 `s` 到達。
- 根據 min-cut 定義，所有從 reachable 節點連出去，且指向 unreachable 節點的邊都在 cut-set 中
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int to, rev;
    int cap;
};

class MaxFlow {
public:
    int n;
    vector<vector<Edge>> g;
    vector<int> level, iter;

    MaxFlow(int n): n(n), g(n), level(n), iter(n) {}

    void add_edge(int from, int to, int cap) {
        g[from].push_back({to, (int)g[to].size(), cap});
        g[to].push_back({from, (int)g[from].size()-1, 0}); // 反向邊
    }

    void bfs(int s) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (auto &e : g[v]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[v] + 1;
                    q.push(e.to);
                }
            }
        }
    }

    int dfs(int v, int t, int upTo) {
        if (v == t) return upTo;
        for (int &i = iter[v]; i < g[v].size(); ++i) {
            Edge &e = g[v][i];
            if (e.cap > 0 && level[v] < level[e.to]) {
                int d = dfs(e.to, t, min(upTo, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    g[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }

    int max_flow(int s, int t) {
        int flow = 0;
        while (true) {
            bfs(s);
            if (level[t] < 0) break;
            fill(iter.begin(), iter.end(), 0);
            int f;
            while ((f = dfs(s, t, INT_MAX)) > 0) {
                flow += f;
            }
        }
        return flow;
    }

    vector<bool> min_cut(int s) {
        vector<bool> visited(n, false);
        queue<int> q;
        visited[s] = true;
        q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (auto &e : g[v]) {
                if (e.cap > 0 && !visited[e.to]) {
                    visited[e.to] = true;
                    q.push(e.to);
                }
            }
        }
        return visited;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    MaxFlow mf(n);

    struct EdgeInput {
        int u, v;
    };
    vector<EdgeInput> edges;

    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        --u; --v;
        mf.add_edge(u, v, 1); // 無向邊 → 兩個方向各加一條容量 1 的邊
        mf.add_edge(v, u, 1);
        edges.push_back({u, v});
    }

    int flow = mf.max_flow(0, n-1); // source = 0, sink = n-1
    cout << flow << "\n";

    vector<bool> reachable = mf.min_cut(0);

    int cnt = 0;
    for (auto [u, v] : edges) {
        if ((reachable[u] && !reachable[v])) {
            cout << u+1 << " " << v+1 << "\n";
            cnt++;
        } else if ((reachable[v] && !reachable[u])) {
            cout << v+1 << " " << u+1 << "\n";
            cnt++;
        }
        if (cnt == flow) break;
    }
}
```

## School Dance [problem](https://cses.fi/problemset/task/1696)
```markdown
題目: 

- 給定二分圖左側 n 位男生、右側 m 位女生，以及 k 對可能的配對關係。
- 每位男生最多只能配對一位女生，每位女生也只能配對一位男生。
- 要求輸出最大配對數量與實際配對結果。
```
``` markdown
解法 : 

**匈牙利演算法（Hungarian Algorithm）**

### 1. 二分圖最大匹配定義

- 本題即為經典的 **Bipartite Maximum Matching** 問題。
- 給定的配對關係是圖中男生對女生的有向邊，求最多能配對多少對 `(男生, 女生)`，使得每人只能參與一對

---

### 2. 匈牙利演算法簡介

- 嘗試對每位男生 `u` 執行 DFS，尋找他可以配對的女生 `v`。
- 若女生 `v` 尚未配對，或其配對的男生 `match[v]` 能被替代（遞迴找空位），則男生 `u` 與女生 `v` 
  成為配對。

- 關鍵轉移條件：
if (match[v] == 0 || bpm(match[v]))

- 每個男生進行一次 `bpm(u)` 嘗試，若成功配對則答案加一。

---

### 3. 時間複雜度

- 最壞為 `O(n * m)`，但在稀疏圖（如本題）表現極佳，實測可快速處理數萬點。
- 適合解二分圖最大匹配問題，n, m ≤ 5e3。

---

### 4. 輸出配對

- `match[v] = u` 表示女生 `v` 被男生 `u` 配對。
- 將所有有配對的 `(u, v)` 列印出來。

---

### 5. 邊界與實作注意

- 男生編號：`1~n`，女生編號：`1~m`（使用統一索引）。
- `adj[u]`：男生 `u` 喜歡的女生清單。
- 每輪匹配都需清空 `vis[]` 陣列。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 5e3 + 5;
int n, m, k;
vector<int> adj[N]; // 男生編號 1..n，女生編號 1..m
int match[N];       // match[v] = u 代表女生 v 配對的男生 u
bool vis[N];

// 匈牙利演算法：嘗試讓男生 u 配上一位女生
bool bpm(int u) {
    for (int v : adj[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (match[v] == 0 || bpm(match[v])) {
            match[v] = u;
            return true;
        }
    }
    return false;
}

int main() {
    cin >> n >> m >> k;
    for (int i = 0; i < k; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); // 男生 u 喜歡女生 v
    }

    int result = 0;
    for (int u = 1; u <= n; ++u) {
        fill(vis, vis + m + 1, false);
        if (bpm(u)) result++;
    }

    cout << result << '\n';
    for (int v = 1; v <= m; ++v) {
        if (match[v]) {
            cout << match[v] << ' ' << v << '\n'; // 男生 女生
        }
    }
}
```

## Distinct Routes [problem](https://cses.fi/problemset/task/1711)
```markdown
題目: 

有 n 個房間與 m 條傳送門，每天遊戲從房間 1 開始，你必須走到房間 n。
每條傳送門只能使用一次（整場遊戲中不可重複）。

問最多可以玩幾天？也就是最多有幾條從 1 到 n 的「edge-disjoint」路徑。
並輸出這些路徑（每條路徑為一組 1 到 n 的房間編號序列）。
```
``` markdown
解法 : 

### 1.這題要找「最多有幾條不重疊的 1 到 n 路徑」，也就是問：

- 有向圖中從節點 1 到節點 n 的最多 edge-disjoint paths。

- 這其實就是經典的最大流問題，把問題轉換成 flow network 後求最大流即可。

---

### 2.Flow 模型轉換

- 每條邊只能用一次 ⇒ 容量設為 1。

- 尋找最多 disjoint path ⇒ 求最大流。

- 我們採用 Edmonds-Karp 實作（BFS 找增廣路），每次找到一條從 source (1) 到 sink (n) 的- 路徑並扣掉這條路徑的容量，直到找不到為止。

- 找完最大流後，我們再根據 flow 記錄下來的殘量圖，把實際的路徑一條條走出來。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)

const int MAXN = 505;
const int MAXM = 5e4 + 5;

struct Edge {
    int to, rev;
    bool used;
};

int n, m;
vector<Edge> g[MAXN];
vector<int> path;

bool bfs(vector<int>& parent) {
    fill(parent.begin(), parent.end(), -1);
    queue<int> q;
    q.push(1);
    parent[1] = 0;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& e : g[u]) {
            if (!e.used && parent[e.to] == -1) {
                parent[e.to] = u;
                q.push(e.to);
                if (e.to == n) return true;
            }
        }
    }
    return false;
}

void add_edge(int u, int v) {
    g[u].push_back({v, (int)g[v].size(), false});
    g[v].push_back({u, (int)g[u].size() - 1, true}); // 反向邊
}

bool dfs(int u, vector<int>& res) {
    if (u == n) return true;
    for (auto& e : g[u]) {
        if (!e.used) {
            e.used = true;
            if (dfs(e.to, res)) {
                res.push_back(e.to);
                return true;
            }
            e.used = false;
        }
    }
    return false;
}

int main() {
    fastio;
    cin >> n >> m;
    vector<tuple<int, int>> edges;

    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        add_edge(a, b);
        edges.emplace_back(a, b);
    }

    int flow = 0;
    vector<int> parent(n + 1);
    while (bfs(parent)) {
        int v = n;
        while (v != 1) {
            int u = parent[v];
            for (auto& e : g[u]) {
                if (e.to == v && !e.used) {
                    e.used = true;
                    g[v][e.rev].used = true; // 反向邊也設為 used
                    break;
                }
            }
            v = u;
        }
        ++flow;
    }

    cout << flow << '\n';
    for (int i = 0; i < flow; ++i) {
        vector<int> res = {1};
        dfs(1, res);
        reverse(res.begin(), res.end());
        cout << res.size() << '\n';
        for (int v : res) cout << v << ' ';
        cout << '\n';
    }
    return 0;
}
```
# Dynamic Programming(23 題)
## Dice Combinations [problem](https://cses.fi/problemset/task/1633)
```markdown
題目: 

給定一個整數 `N`，表示要用擲骰子的方式（每次 1~6 點數）湊出總和 `N` 的方法數。  
結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 狀態定義
使用動態規劃：
dp[i] = 湊出總和 i 的方法數

---

### 2. 狀態轉移
每次可以選擇擲出 `1~6` 的點數：
dp[i] = dp[i-1] + dp[i-2] + ... + dp[i-6] (只考慮 i-j >= 0 的情況)

初始條件：
dp[0] = 1 // 空的組合
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define MOD 1000000007
typedef long long LL;

int main(){
    LL N;
    cin >> N;

    vector<LL> dp(N + 1);
    dp[0] = 1;
    for (int i = 1; i <= N; ++i) {
        for (int j = 1; j <= 6 && i - j >= 0; ++j) {
            dp[i] = (dp[i] + dp[i - j]) % MOD;
        }
    }
    cout << dp[N];
}
```

## Minimizing Coins [problem](https://cses.fi/problemset/task/1634)
```markdown
題目: 

給定：
- `n` 種不同面值的硬幣
- 一個目標金額 `x`

請計算湊成 `x` 所需的最少硬幣數量。  
若無法湊成，輸出 `-1`。
```
``` markdown
解法 : 

### 1. 動態規劃 (DP)
定義：
dp[i] = 湊成金額 i 所需的最少硬幣數

初始值：
dp[0] = 0
dp[i] = INF (對於所有 i > 0)

---

### 2. 狀態轉移
對於每個硬幣 `c`：
dp[i] = min(dp[i], dp[i - c] + 1) (for i >= c)

代表「若要湊 `i`，考慮使用一枚面值 `c` 的硬幣，再加上湊成 `i-c` 的最少硬幣數」。

---

### 3. 最終答案
- 若 `dp[x] == INF` → 輸出 `-1`（表示無法湊成）
- 否則輸出 `dp[x]`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define INF LL(1e18)
typedef long long LL;

int main() {
    LL n, x;
    cin >> n >> x;

    vector<LL> coins(n);
    for (LL &c : coins) cin >> c;

    vector<LL> dp(x + 1, INF);
    dp[0] = 0;

    for (int c : coins) {
        for (int i = c; i <= x; ++i) {
            dp[i] = min(dp[i], dp[i - c] + 1);
        }
    }

    cout << (dp[x] == INF ? -1 : dp[x]) << "\n";
}
```

## Coin Combinations I [problem](https://cses.fi/problemset/task/1634)
```markdown
題目: 

給定：
- `n` 種不同面值的硬幣
- 一個目標金額 `x`

請計算有多少種方式可以湊成 `x`，其中：
- 硬幣順序不同視為不同方法。
- 結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 動態規劃 (DP)
定義：
dp[i] = 湊成金額 i 的方法數

初始條件：
dp[0] = 1 // 空組合

---

### 2. 狀態轉移
對於每個金額 `i`：
dp[i] = Σ dp[i - c] (對所有硬幣 c，且 i >= c)

因為硬幣的順序不同會被視為不同組合，因此必須以金額為外層循環。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define MOD 1000000007
typedef long long LL;

int main() {
    LL n, x;
    cin >> n >> x;

    vector<LL> coins(n);
    for (LL &c : coins) cin >> c;

    vector<LL> dp(x + 1, 0);
    dp[0] = 1;

    for (int i = 0; i <= x; ++i) {
        for (int c : coins) {
            if (i - c >= 0)
                dp[i] = (dp[i] + dp[i - c]) % MOD;
        }
    }

    cout << dp[x] << "\n";
}
```

## Coin Combinations II [problem](https://cses.fi/problemset/task/1636)
```markdown
題目: 

給定：
- `n` 種不同面值的硬幣
- 一個目標金額 `x`

請計算有多少種方式可以湊成 `x`，其中：
- 硬幣順序不同視為**相同**方法。
- 結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 動態規劃 (DP)
定義：
dp[i] = 湊成金額 i 的方法數

初始條件：
dp[0] = 1 // 空組合

---

### 2. 狀態轉移
對於每個硬幣 `c`：
for (i = c; i <= x; i++)
dp[i] = (dp[i] + dp[i - c]) % MOD

這樣能確保每種硬幣只會被計算一次，避免重複計算不同順序的組合。

---

### 3. Coin Combinations I 與 II 的差異
| 題目                  | 外層迴圈 | 內層迴圈 | 是否區分順序 |
|----------------------|----------|---------|-------------|
| Coin Combinations I  | 金額     | 硬幣     | 區分         |
| Coin Combinations II | 硬幣     | 金額     | 不區分       |
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define MOD 1000000007
typedef long long LL;

int main() {
    LL n, x;
    cin >> n >> x;

    vector<LL> coins(n);
    for (LL &c : coins) cin >> c;

    vector<LL> dp(x + 1, 0);
    dp[0] = 1;

    for (int c : coins) {
        for (int i = c; i <= x; ++i) {
            dp[i] = (dp[i] + dp[i - c]) % MOD;
        }
    }

    cout << dp[x] << "\n";
}
```

## Removing Digits [problem](https://cses.fi/problemset/task/1637)
```markdown
題目: 

給定一個整數 `N`，每次可以從中減去它的一個「非零數字」，問最少要幾步才能將 `N` 變為 `0`。
```
``` markdown
解法 : 

### 1. 狀態定義
使用 BFS 或 DP 來解：
- `dp[i]` = 從 `i` 減到 `0` 所需的最少步數

初始值：
dp[N] = 0

---

### 2. BFS 探索
1. 建立隊列 `q`，從 `N` 開始。
2. 每次從 `q` 取出 `num`：
   - 若 `num == 0`，輸出 `dp[0]`。
   - 否則取出 `num` 的所有「非零數字」。
   - 嘗試將 `num` 減去每個數字 `d` 生成 `num-d`，若能更新 `dp[num-d]` 則加入 `q`。

---

### 3. 為什麼 BFS
- 每次操作的成本是 `1`，BFS 可以保證第一次訪問到某個狀態就是最短步數。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define INF LL(1e18)
typedef long long LL;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    LL N;
    cin >> N;

    vector<LL> dp(N + 1, INF);
    dp[N] = 0;
    queue<LL> q;
    q.push(N);

    while (!q.empty()) {
        LL num = q.front(), tmp = q.front();
        q.pop();

        if (num == 0) {
            cout << dp[num];
            return 0;
        }

        set<LL> digits;
        while (tmp) {
            digits.insert(tmp % 10);
            tmp /= 10;
        }

        for (auto d : digits) {
            if (d == 0 || num - d < 0) continue;
            if (dp[num] + 1 < dp[num - d]) {
                dp[num - d] = dp[num] + 1;
                q.push(num - d);
            }
        }
    }
}
```

## Grid Paths I [problem](https://cses.fi/problemset/task/1638)
```markdown
題目: 

給定：
- 一個 `N x N` 的網格
- 每個格子可能是可通行 `'.'` 或障礙 `'*'`

請計算從 `(0,0)` 到 `(N-1,N-1)` 只能向右或向下移動的路徑數量，結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 狀態定義
建立一個 DP 表：
dp[i][j] = 從 (0,0) 走到 (i,j) 的路徑數

---

### 2. 狀態轉移
- 若 `grid[i][j]` 是障礙 `'*'` → `dp[i][j] = 0`
- 否則：
dp[i][j] = dp[i-1][j] + dp[i][j-1] (考慮邊界檢查)

初始條件：
dp[0][0] = 1 (若起點非障礙)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define MOD 1000000007
#define INF LL(1e18)
typedef long long LL;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    LL N;
    cin >> N;

    vector<vector<pair<char, LL>>> grid(N, vector<pair<char, LL>>(N));

    for (int i = 0; i < N; ++i) {
        string input;
        cin >> input;
        for (int j = 0; j < N; ++j) {
            grid[i][j].first = input[j];
            grid[i][j].second = (input[j] != '*') ? 0 : INF;
        }
    }

    if (grid[0][0].second == INF) {
        cout << 0;
        return 0;
    }

    grid[0][0].second = 1;

    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < N; ++j) {
            if (grid[i][j].second == INF) continue;
            if (i - 1 >= 0 && grid[i-1][j].second != INF) {
                grid[i][j].second += grid[i-1][j].second;
                grid[i][j].second %= MOD;
            }
            if (j - 1 >= 0 && grid[i][j-1].second != INF) {
                grid[i][j].second += grid[i][j-1].second;
                grid[i][j].second %= MOD;
            }
        }
    }

    cout << (grid[N-1][N-1].second == INF ? 0 : grid[N-1][N-1].second);
}
```

## Book Shop [problem](https://cses.fi/problemset/task/1158)
```markdown
題目: 

給定：
- `N` 本書，每本書有：
  - 價格 `p`
  - 價值 `v`
- 一個總預算 `X`

請在不超過預算的情況下，選擇書籍使總價值最大。
```
``` markdown
解法 : 

### 1. 狀態定義
使用 0/1 背包動態規劃：
dp[j] = 在預算 j 內能獲得的最大價值

---

### 2. 狀態轉移
對於每本書 `(p, v)`：
for j from X down to p:
dp[j] = max(dp[j], dp[j - p] + v)

這樣可以確保每本書只被使用一次（從右到左更新）。

---

### 3. 初始化
dp[0] = 0
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long LL;
typedef pair<LL, LL> pLL;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    LL N, X;
    cin >> N >> X;

    vector<pLL> item(N);
    for (int i = 0; i < N; ++i) cin >> item[i].first;  // 價格
    for (int i = 0; i < N; ++i) cin >> item[i].second; // 價值

    vector<LL> dp(X + 1, 0);

    for (int i = 0; i < N; ++i) {
        for (int j = X; j >= item[i].first; --j) {
            dp[j] = max(dp[j], dp[j - item[i].first] + item[i].second);
        }
    }

    cout << dp[X];
}
```


## Array Description [problem](https://cses.fi/problemset/task/1746)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`，每個元素的取值範圍是 `1` 到 `m`。
- 若某個 `a[i]` 的值為 `0`，表示該位置的值尚未決定，可以自由選擇 `1~m`。
- 若 `a[i] != 0`，表示該位置的值已固定。
  
要求：
- 計算有多少種方式可以將所有 `0` 補上數字，並且滿足：
  - 對所有 `1 ≤ i < n`，有 `|a[i] - a[i+1]| ≤ 1`。

答案對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 狀態定義
令 `dp[i][x]` 代表「考慮到第 `i` 個位置且 `a[i] = x`」時的方案數。

---

### 2. 狀態轉移
- 若 `a[i] == 0` (未決定)：
dp[i][x] = dp[i-1][x-1] + dp[i-1][x] + dp[i-1][x+1]
其中 `x-1` 和 `x+1` 必須在 `1~m` 範圍內。

- 若 `a[i] != 0` (固定)：
dp[i][a[i]] = dp[i-1][a[i]-1] + dp[i-1][a[i]] + dp[i-1][a[i]+1]
其他 `x` 皆為 `0`。

---

### 3. 初始化
- 對 `i = 1`：
- 若 `a[1] == 0`：`dp[1][x] = 1` (for all `1 ≤ x ≤ m`)
- 否則：`dp[1][a[1]] = 1`

---

### 4. 最終答案
ans = Σ dp[n][x] (for x = 1 to m)
並對 `10^9+7` 取模。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; ++i) cin >> a[i];

    vector<vector<int>> dp(n + 1, vector<int>(m + 2, 0));

    // 初始化
    if (a[1] == 0) {
        for (int x = 1; x <= m; ++x) dp[1][x] = 1;
    } else {
        dp[1][a[1]] = 1;
    }

    // DP 轉移
    for (int i = 2; i <= n; ++i) {
        if (a[i] == 0) {
            for (int x = 1; x <= m; ++x) {
                dp[i][x] = ((long long)dp[i-1][x-1] + dp[i-1][x] + dp[i-1][x+1]) % MOD;
            }
        } else {
            int x = a[i];
            dp[i][x] = ((long long)dp[i-1][x-1] + dp[i-1][x] + dp[i-1][x+1]) % MOD;
        }
    }

    // 計算答案
    int ans = 0;
    for (int x = 1; x <= m; ++x) {
        ans = (ans + dp[n][x]) % MOD;
    }

    cout << ans << "\n";
    return 0;
}
```

## Counting Towers [problem](https://cses.fi/problemset/task/2413)
```markdown
題目: 

給定一個整數 `n`，表示塔的高度，我們需要計算能夠用 2×1 與 1×2 的磚塊填滿 2×n 的塔的所有排列數。
結果需對 `10^9+7` 取模。

- 每次查詢給定一個 `n`。
- 對每個 `n`，輸出所有可能的填滿方式數量。
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `dp[0][i]` 代表 **高度為 i** 的塔且最上層為「2x1 tile + 2x1 tile」(橫向兩格) 的組合數。
- 設 `dp[1][i]` 代表 **高度為 i** 的塔且最上層為「1x2 tile + 1x2 tile」(直向兩格) 或交錯組合的組合數。
- 
---

### 2. 狀態轉移
對於高度 `i (≥ 2)`：
- **dp[0][i]**  
  - 可以從 `dp[0][i-1]` 延伸（直接往上疊一層橫向兩格）  
  - 或從 `dp[1][i-1]` 轉換（把垂直組合替換成橫向）  
  - 每次加法乘上對應的排列數：
    dp[0][i] = 2 \cdot dp[0][i-1] + dp[1][i-1]

- **dp[1][i]**  
  - 可以從 `dp[1][i-1]` 延伸（直接往上疊垂直兩格）  
  - 或從 `dp[0][i-1]` 轉換（橫向變垂直）  
  - 每次加法乘上對應的排列數：
    dp[1][i] = 4 \cdot dp[1][i-1] + dp[0][i-1]
    
最後結果：
ans = (dp[0][n] + dp[1][n]) mod 10^9+7

---

### 3. 初始化
- `dp[0][1] = 1`  
- `dp[1][1] = 1`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    const int MOD = 1e9 + 7;
    const int MAXN = 2e6;
    
    vector<vector<ll>> dp(2, vector<ll>(MAXN + 1));
    dp[0][1] = 1;
    dp[1][1] = 1;

    for (int i = 2; i <= MAXN; i++) {
        dp[0][i] = (dp[0][i - 1] * 2 + dp[1][i - 1]) % MOD;
        dp[1][i] = (dp[1][i - 1] * 4 + dp[0][i - 1]) % MOD;
    }

    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (dp[0][n] + dp[1][n]) % MOD << "\n";
    }
    return 0;
}
```

## Edit Distance [problem](https://cses.fi/problemset/task/1639)
```markdown
題目: 

給定兩個字串 `a` 與 `b`，我們要計算將 `a` 轉換為 `b` 所需的最少編輯次數。  
允許的操作：
- 插入一個字元
- 刪除一個字元
- 替換一個字元  

輸出最小操作數。
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `dp[i][j]` 代表將字串 `a` 的前 `i` 個字元轉為字串 `b` 的前 `j` 個字元所需的最少編輯次數。

---

### 2. 狀態轉移
- 若 `a[i-1] == b[j-1]`：
dp[i][j] = dp[i-1][j-1]

- 否則：
dp[i][j] = 1 + min(
dp[i-1][j], // 刪除 a[i-1]
dp[i][j-1], // 插入 b[j-1]
dp[i-1][j-1] // 替換 a[i-1] 為 b[j-1])

---

### 3. 初始化
- `dp[0][j] = j`：將空字串轉換為 `b` 的前 j 個字元 → 需插入 j 次
- `dp[i][0] = i`：將 `a` 的前 i 個字元轉換為空字串 → 需刪除 i 次

---

### 4. 最終答案
ans = dp[n][m]
其中 `n = |a|`, `m = |b|`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    string a, b;
    cin >> a >> b;
 
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1));
 
    for (int i = 0; i <= n; ++i) dp[i][0] = i;
    for (int j = 0; j <= m; ++j) dp[0][j] = j;
 
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = min({dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1});
        }
    }
 
    cout << dp[n][m] << endl;
}
```

## Longest Common Subsequence [problem](https://cses.fi/problemset/task/3403)
```markdown
題目: 

給定兩個長度分別為 `N` 與 `M` 的整數序列 `a` 和 `b`，請找出它們的最長公共子序列
（Longest Common Subsequence, LCS），並輸出：

1. LCS 的長度
2. LCS 的一組序列
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `LCS[i][j]` 表示 `a` 的前 `i` 個元素與 `b` 的前 `j` 個元素的最長公共子序列長度。

---

### 2. 狀態轉移
- 若 `a[i] == b[j]`：
LCS[i][j] = LCS[i-1][j-1] + 1
- 否則：
LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1])

---

### 3. 初始化
- `LCS[0][j] = 0`
- `LCS[i][0] = 0`

---

### 4. LCS 回溯
從 `LCS[N][M]` 開始回溯：
- 若 `a[i] == b[j]` → 將該元素加入結果，`i--`, `j--`
- 否則 → 取 `LCS[i-1][j]` 或 `LCS[i][j-1]` 中較大的方向移動
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
int main() {
    fastio;
    LL N, M;
    cin >> N >> M;
 
    vector<vector<LL>> LCS(N + 1, vector<LL>(M + 1, 0));
    vector<LL> a(N + 1), b(M + 1);
 
    for (int i = 1; i <= N; ++i) cin >> a[i];
    for (int j = 1; j <= M; ++j) cin >> b[j];
 
    for (int i = 1; i <= N; ++i) {
        for (int j = 1; j <= M; ++j) {
            if (a[i] == b[j]) {
                LCS[i][j] = LCS[i-1][j-1] + 1;
            } else {
                LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1]);
            }
        }
    }
    
    cout << LCS[N][M] << '\n';
 
    int i = N, j = M;
    vector<LL> result;
 
    while (i > 0 && j > 0) {
        if (a[i] == b[j]) {
            result.push_back(a[i]);
            --i; --j;
        }
        else if (LCS[i-1][j] > LCS[i][j-1]) {
            --i;
        }
        else {
            --j;
        }
    }
 
    reverse(result.begin(), result.end());
    for (LL val : result) cout << val << " ";
    cout << "\n";
}
```

## Rectangle Cutting [problem](https://cses.fi/problemset/task/1744)
```markdown
題目: 

給定一個 `a × b` 的矩形，你可以沿著水平或垂直方向切割，直到所有的矩形都是正方形。
請輸出最少的切割次數。
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `dp[w][h]` 表示將 `w × h` 的矩形切割成正方形所需的最少切割次數。

---

### 2. 狀態轉移
- 如果 `w == h`，矩形本身就是正方形，不需要切割：
dp[w][h] = 0
- 否則：
1. 嘗試垂直切割：
   dp[w][h] = min(dp[w][h], 1 + dp[i][h] + dp[w-i][h])  for i in [1, w-1]
2. 嘗試水平切割：
   dp[w][h] = min(dp[w][h], 1 + dp[w][j] + dp[w][h-j])  for j in [1, h-1]

---

### 3. 初始化
- `dp[w][h] = 0` 當 `w == h`。
- 其他情況初始化為 `INT_MAX`。

---

### 4. 最終答案
ans = dp[a][b]
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int dp[501][501];
 
int main() {
    int a, b;
    cin >> a >> b;
 
    for (int w = 1; w <= a; ++w) {
        for (int h = 1; h <= b; ++h) {
            if (w == h) {
                dp[w][h] = 0;
            } else {
                dp[w][h] = INT_MAX;
                for (int i = 1; i < w; ++i) {
                    dp[w][h] = min(dp[w][h], 1 + dp[i][h] + dp[w-i][h]);
                }
                for (int j = 1; j < h; ++j) {
                    dp[w][h] = min(dp[w][h], 1 + dp[w][j] + dp[w][h-j]);
                }
            }
        }
    }
 
    cout << dp[a][b] << "\n";
}
```

## Minimal Grid Path [problem](https://cses.fi/problemset/task/3359)
```markdown
題目: 

給定一個 `n × n` 的字元網格 `g`，每個格子都有一個大寫字母。  
你需要從 `(1,1)` 出發，每次只能向下或向右移動，直到到達 `(n,n)`。  
請輸出沿途經過字元所組成的字典序最小的路徑字串。
```
``` markdown
解法 : 

### 1. BFS + Layer Search
- 我們從 `(1,1)` 出發，維護當前所有可達的座標。
- 每一層（相同距離）我們只挑出「下一步的最小字元」，並過濾掉非最小字元的路徑。
- 透過 BFS 保證路徑長度遞增，而「最小字元選擇」確保字典序最小。

---

### 2. 狀態定義
- `vst[i][j]`：記錄 `(i,j)` 是否已經被訪問。
- `q1`、`q2`：BFS 隊列，`q1` 是當前層，`q2` 是下一層。
- `ans`：目前的路徑字串。

---

### 3. 演算法流程
1. 將 `(1,1)` 丟入 `q1`，並將 `g[1][1]` 加入 `ans`。
2. BFS：
   - 對 `q1` 中所有節點，嘗試向右、向下擴展。
   - 找到當層所有可擴展格子的最小字元 `gmin`。
   - 將所有字元等於 `gmin` 的格子加入 `q2`。
   - 交換 `q1` 與 `q2`，並將 `gmin` 加入 `ans`。
3. 重複直到到達 `(n,n)`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 3001;
bool vst[N][N];
 
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int n;
    cin >> n;
    vector<string> g(n + 1);
    for (int i = 1; i <= n; ++i) {
        cin >> g[i];
        g[i] = 'x' + g[i]; // 1-based index
    }
 
    string ans;
    queue<pair<int, int>> q1, q2;
    q1.push({1, 1});
    vst[1][1] = true;
    ans += g[1][1];
    bool done = false;
 
    while (!done) {
        char gmin = 'Z';
        vector<pair<int, int>> temp;
 
        while (!q1.empty()) {
            auto [i, j] = q1.front(); 
            q1.pop();
            if (i == n && j == n) done = true;
 
            if (i + 1 <= n && !vst[i + 1][j]) {
                vst[i + 1][j] = true;
                temp.push_back({i + 1, j});
                gmin = min(gmin, g[i + 1][j]);
            }
            if (j + 1 <= n && !vst[i][j + 1]) {
                vst[i][j + 1] = true;
                temp.push_back({i, j + 1});
                gmin = min(gmin, g[i][j + 1]);
            }
        }
 
        if (done) break;
        ans += gmin;
 
        for (auto& p : temp) {
            if (g[p.first][p.second] == gmin) {
                q2.push(p);
            }
        }
        swap(q1, q2);
    }
 
    cout << ans << '\n';
}
```

## Money Sums [problem](https://cses.fi/problemset/task/1745)
```markdown
題目: 

給定 `N` 個硬幣，每個硬幣有一個正整數值，求出能用這些硬幣組成的所有不同金額。
- 第一行輸出總共有幾個金額。
- 第二行輸出所有金額，依升序排列。
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `dp[x]` 表示是否能夠組成金額 `x`。

---

### 2. 狀態轉移
- 初始化：`dp[0] = true`（0 元可以不用任何硬幣組成）。
- 遍歷每個硬幣 `v`：
for j from sum down to v:
    - if dp[j-v] 為真:
        - dp[j] = true
        - 用倒序避免重複計算同一硬幣。

---

### 3. 結果
- 遍歷 `dp[1..sum]`，將所有為 `true` 的金額輸出。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
int main() {
    fastio;
    LL N;
    cin >> N;
    
    LL sum = 0;
    vector<LL> arr(N);
    for (int i = 0; i < N; ++i) {
        cin >> arr[i];
        sum += arr[i];
    }
 
    vector<bool> dp(sum + 1, false);
    dp[0] = true;
 
    for (int coin : arr) {
        for (int j = sum; j >= coin; --j) {
            if (dp[j - coin])
                dp[j] = true;
        }
    }
 
    vector<LL> ans;
    for (int i = 1; i <= sum; ++i) {
        if (dp[i]) ans.push_back(i);
    }
 
    cout << ans.size() << '\n';
    for (auto e : ans) cout << e << ' ';
}
```

## Removal Game [problem](https://cses.fi/problemset/task/1097)
```markdown
題目: 

有 `n` 個數字排成一列，兩名玩家輪流從左端或右端取走一個數字。
兩人都採用最佳策略。請計算先手能獲得的最大總分。
```
``` markdown
解法 : 

### 1. 狀態定義
- 設 `dp[l][r]` 代表「在區間 `[l, r]` 內，輪到當前玩家時，能取得的最大分數」。

---

### 2. 狀態轉移
假設前綴和 `sum[i]` 表示前 `i` 個數字的總和：
- 若取左邊 `a[l]`：
分數 = 總和(sum[r] - sum[l-1]) - dp[l+1][r]

- 若取右邊 `a[r]`：
分數 = 總和(sum[r] - sum[l-1]) - dp[l][r-1]

取兩者的最大值：
dp[l][r] = max(
sum[r] - sum[l-1] - dp[l+1][r],
sum[r] - sum[l-1] - dp[l][r-1]
)

---

### 3. 初始化
- 當 `l == r`，只剩一個數字：
dp[l][r] = a[l]

---

### 4. 最終答案
- `dp[1][n]` 為先手能取得的最大分數。
```

``` cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
 
signed main() {
    int n;
    cin >> n;
    vector<int> a(n+1), sum(n+1, 0);
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        sum[i] = sum[i-1] + a[i];
    }
 
    vector<vector<int>> dp(n+2, vector<int>(n+2, 0));
 
    for (int len = 1; len <= n; ++len) {
        for (int l = 1; l+len-1 <= n; ++l) {
            int r = l+len-1;
            dp[l][r] = max(
                sum[r] - sum[l-1] - dp[l+1][r],
                sum[r] - sum[l-1] - dp[l][r-1]
            );
        }
    }
 
    cout << dp[1][n] << "\n";
}
```

## Two Sets II [problem](https://cses.fi/problemset/task/1093)
```markdown
題目: 

給定一個整數 `n`，將 `1..n` 劃分為兩個集合，使得兩個集合的總和相等。
請輸出這樣的劃分數量，結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 總和判斷
- `total = n * (n+1) / 2`
- 若 `total` 為奇數，無法劃分 → 輸出 `0`

---

### 2. 狀態定義
- 設 `dp[s]` 表示可以組成總和 `s` 的劃分方法數。

---

### 3. 狀態轉移
- 初始化：
dp[0] = 1

- 對每個數字 `i`：
for s = target down to i:
dp[s] = (dp[s] + dp[s-i]) % MOD

這樣避免重複計算同一個數字。

---

### 4. 最終答案
- `target = total / 2`
- 由於每個劃分被計算了 2 次（兩個集合互換），需除以 2。
- 在模數下除以 2 使用模逆元：
ans = dp[target] * ((MOD+1)/2) % MOD
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MOD = 1e9+7;
 
int main() {
    int n;
    cin >> n;
 
    int total = n*(n+1)/2;
    if (total % 2 != 0) {
        cout << 0 << "\n";
        return 0;
    }
 
    int target = total / 2;
    vector<int> dp(target+1, 0);
    dp[0] = 1;
 
    for (int i = 1; i <= n; ++i) {
        for (int s = target; s >= i; --s) {
            dp[s] = (dp[s] + dp[s-i]) % MOD;
        }
    }
 
    int ans = (1LL * dp[target] * ((MOD+1)/2)) % MOD;
    cout << ans << "\n";
}
```

## Mountain Range [problem](https://cses.fi/problemset/task/3314)
```markdown
題目: 

給定 `n` 座山的高度 `h[i]`，定義「山峰鏈」為：
- 從某座山開始，可以往左或往右延伸到第一座比它高的山，重複此過程，直到無法再延伸。

請求出所有山峰中，最長的山峰鏈長度。
```
``` markdown
解法 : 

### 1. 前處理（單調棧）
對於每一座山，我們需要：
- `left[i]`：左邊最近一座比 `h[i]` 高的山。
- `right[i]`：右邊最近一座比 `h[i]` 高的山。

這可以利用 **單調遞減棧** 在 O(n) 內完成。

---

### 2. 狀態定義
- `dp[i]`：以第 `i` 座山為起點可形成的最大山峰鏈長度。

---

### 3. 狀態轉移
將山峰依高度從高到低排序，對每座山 `i`：
dp[i] = 1
if left[i] != -1:
dp[i] = max(dp[i], dp[left[i]] + 1)
if right[i] != n:
dp[i] = max(dp[i], dp[right[i]] + 1)

---

### 4. 答案
遍歷所有 `dp[i]` 取最大值，即為最長的山峰鏈長度。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int N = 2e5+5;
int n, h[N], dp[N];
 
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
 
    cin >> n;
    for (int i = 0; i < n; ++i) cin >> h[i];
 
    vector<int> left(n, -1), right(n, n);
    stack<int> stk;
 
    // 左邊界
    for (int i = 0; i < n; ++i) {
        while (!stk.empty() && h[stk.top()] <= h[i]) stk.pop();
        if (!stk.empty()) left[i] = stk.top();
        stk.push(i);
    }
 
    while (!stk.empty()) stk.pop();
 
    // 右邊界
    for (int i = n-1; i >= 0; --i) {
        while (!stk.empty() && h[stk.top()] <= h[i]) stk.pop();
        if (!stk.empty()) right[i] = stk.top();
        stk.push(i);
    }
 
    int ans = 0;
 
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b) {
        return h[a] > h[b];
    });
 
    for (int i : idx) {
        dp[i] = 1;
        if (left[i] != -1) dp[i] = max(dp[i], dp[left[i]] + 1);
        if (right[i] != n) dp[i] = max(dp[i], dp[right[i]] + 1);
        ans = max(ans, dp[i]);
    }
 
    cout << ans << "\n";
}
```

## Increasing Subsequence [problem](https://cses.fi/problemset/task/1145)
```markdown
題目: 

給定一個長度為 `N` 的數列，請找出它的最長遞增子序列（LIS）的長度。
```
``` markdown
解法 : 

### 1. 演算法
利用「貪心 + 二分搜尋」來求 LIS：
- 維護一個動態陣列 `dp`，代表目前為止所有可能的 LIS「結尾元素」。
- 遍歷數列：
  1. 若 `x` 比 `dp` 末尾大 → 將 `x` 加入 `dp`。
  2. 否則 → 用 `lower_bound` 找到 `dp` 中第一個 `>= x` 的位置並替換。

最後 `dp` 的長度就是 LIS 長度。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
    vector<LL> arr(N);
    for (int i = 0; i < N; ++i) {
        cin >> arr[i];
    }
    cout << LIS(arr);
}
```

## Projects [problem](https://cses.fi/problemset/task/1140)
```markdown
題目: 

給定 `n` 個專案，每個專案有：
- 開始時間 `a`
- 結束時間 `b`
- 收益 `p`

你可以選擇若干個不重疊的專案來最大化總收益，請輸出最大收益。
```
``` markdown
解法 : 

### 1. 離散化時間
因為 `a`、`b` 的範圍可能很大，需先將所有的開始與結束時間收集後壓縮成連續座標。

---

### 2. 專案排序
將專案依照結束時間 `b` 升序排序，方便 DP 時處理。

---

### 3. 狀態定義
- 設 `dp[i]` 表示考慮到離散化時間 `i` 時，能取得的最大收益。

---

### 4. 狀態轉移
對於每個時間 `i`：
1. 不選擇專案：
dp[i] = max(dp[i], dp[i-1])

2. 處理所有在 `i` 結束的專案：
dp[i] = max(dp[i], dp[proj.a-1] + proj.p)

---

### 5. 最終答案
- `dp[m]`，其中 `m` 為離散化後的最大時間。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
 
struct Project {
    int a, b;
    ll p;
};
 
int main() {
    ios::sync_with_stdio(false); cin.tie(0);
    int n;
    cin >> n;
 
    vector<Project> projects(n);
    vector<int> coords;
    for (int i = 0; i < n; ++i) {
        cin >> projects[i].a >> projects[i].b >> projects[i].p;
        coords.push_back(projects[i].a);
        coords.push_back(projects[i].b);
    }
 
    // 離散化
    sort(coords.begin(), coords.end());
    coords.erase(unique(coords.begin(), coords.end()), coords.end());
 
    auto get = [&](int x) {
        return lower_bound(coords.begin(), coords.end(), x) - coords.begin() + 1;
    };
 
    for (auto& proj : projects) {
        proj.a = get(proj.a);
        proj.b = get(proj.b);
    }
 
    // 按結束時間排序
    sort(projects.begin(), projects.end(), [](const Project& p1, const Project& p2) {
        return p1.b < p2.b;
    });
 
    int m = coords.size();
    vector<ll> dp(m+2, 0);
 
    int idx = 0;
    for (int i = 1; i <= m; ++i) {
        dp[i] = max(dp[i], dp[i-1]);  // 不選
        while (idx < n && projects[idx].b == i) {
            dp[i] = max(dp[i], dp[projects[idx].a - 1] + projects[idx].p);
            ++idx;
        }
    }
 
    cout << dp[m] << "\n";
}
```

## Elevator Rides [problem](https://cses.fi/problemset/task/1653)
```markdown
題目: 

有 `n` 個人，每個人有一個體重 `w[i]`，一部電梯的最大載重為 `x`。
你需要計算至少需要幾趟電梯才能將所有人運送完畢。

輸出最少電梯趟數。
```
``` markdown
解法 : 

### 1. 狀態定義
使用 bitmask 來表示哪些人已經被運送：
- `dp[mask] = {rides, weight}`：
  - `rides`：目前所需的電梯趟數。
  - `weight`：最後一趟電梯已使用的重量。

---

### 2. 狀態轉移
對於每個 `mask`：
- 嘗試將某個未上電梯的人 `i` 加進來：
  1. 若 `dp[mask].weight + w[i] <= x`：
     - 將此人加入當前電梯 →  
       - dp[next] = min(dp[next], {dp[mask].rides, dp[mask].weight + w[i]})
  2. 否則 → 需要開新的一趟電梯：
       - dp[next] = min(dp[next], {dp[mask].rides+1, w[i]})

---

### 3. 初始化
- `dp[0] = {1, 0}`：空集合需要 1 趟電梯（但重量 0）。

---

### 4. 最終答案
- `dp[(1<<n) - 1].rides` 即為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef pair<int,int> pii;
 
int n, x;
int w[21];
pii dp[1<<20];  // (rides, weight)
 
int main() {
    ios::sync_with_stdio(false); cin.tie(0);
    cin >> n >> x;
    for (int i = 0; i < n; ++i) cin >> w[i];
 
    int N = 1<<n;
    for (int mask = 0; mask < N; ++mask) dp[mask] = {n+1, 0};
    dp[0] = {1, 0};  // 空狀態：1 趟空電梯
 
    for (int mask = 0; mask < N; ++mask) {
        for (int i = 0; i < n; ++i) {
            if (!(mask & (1<<i))) {
                int next = mask | (1<<i);
                if (dp[mask].second + w[i] <= x) {
                    dp[next] = min(dp[next], {
                        dp[mask].first,
                        dp[mask].second + w[i]
                    });
                } else {
                    dp[next] = min(dp[next], {
                        dp[mask].first+1,
                        w[i]
                    });
                }
            }
        }
    }
 
    cout << dp[N-1].first << "\n";
}
```

## Counting Tilings [problem](https://cses.fi/problemset/task/2181)
```markdown
題目: 

給定一個 `n × m` 的棋盤（`n ≤ 11`, `m ≤ 1000`），使用 `2 × 1` 多米諾骨牌完全填滿棋盤。  
輸出可能的鋪法數量，結果需對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 狀態定義
- `dp[col][mask]`：表示填到第 `col` 列時，當前列的「填充狀態」為 `mask` 的方案數。

---

### 2. 狀態轉移
透過 DFS 生成所有可能的合法轉換：
- `dfs(row, prev_mask, curr_mask)`：
  - `row`：目前掃描到的格子列
  - `prev_mask`：上一列的填充狀態
  - `curr_mask`：本列的填充狀態
  - 遞歸處理每一列：
    1. 若當前格子已被上一列佔用 → 跳到下一格。
    2. 嘗試放置水平骨牌。
    3. 嘗試放置垂直骨牌。

當掃描到最底層 (`row == n`) 時，記錄一個從 `prev_mask → curr_mask` 的轉換。

---

### 3. 主 DP 遍歷
1. 初始化 `dp[0][0] = 1`。
2. 對於每一列 `j`，枚舉所有 `mask`：
   - 生成所有 `transitions`。
   - 對每個合法轉換 `(mask → next_mask)`：
     ```
     dp[j+1][next_mask] += dp[j][mask]
     ```

---

### 4. 答案
- `dp[m][0]` 即為最終解（所有列填滿）。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MOD = 1e9+7;
 
int n, m;
int dp[1001][1<<11];
 
void dfs(int row, int prev_mask, int curr_mask, int n, vector<pair<int,int>> &trans) {
    if (row == n) {
        trans.emplace_back(prev_mask, curr_mask);
        return;
    }
    if (prev_mask & (1<<row)) {
        dfs(row+1, prev_mask, curr_mask, n, trans);
    } else {
        if (row+1 < n && !(prev_mask & (1<<(row+1)))) {
            dfs(row+2, prev_mask, curr_mask, n, trans); // 放橫的
        }
        dfs(row+1, prev_mask, curr_mask|(1<<row), n, trans); // 放豎的
    }
}
 
int main() {
    cin >> n >> m;
 
    dp[0][0] = 1;
 
    for (int j = 0; j < m; ++j) {
        for (int mask = 0; mask < (1<<n); ++mask) {
            if (dp[j][mask] == 0) continue;
 
            vector<pair<int,int>> trans;
            dfs(0, mask, 0, n, trans);
 
            for (auto [from, to] : trans) {
                dp[j+1][to] = (dp[j+1][to] + dp[j][mask]) % MOD;
            }
        }
    }
 
    cout << dp[m][0] << "\n";
}
```

## Counting Numbers [problem](https://cses.fi/problemset/task/2220)
```markdown
題目: 

給定兩個整數 `a` 和 `b`，計算在區間 `[a, b]` 中，有多少個數字 **沒有相鄰的相同數字**。
```
``` markdown
解法 : 

### 1. 數位 DP 狀態定義
使用數位 DP 計算 `[0, x]` 中的合法數字數量，最後用 `solve(b) - solve(a-1)` 得到答案。

- `dp[pos][tight][prev]`：
  - `pos`：當前處理到的位數
  - `tight`：是否受到上界限制（若為 1 則只能取到 `s[pos]`）
  - `prev`：上一位數字（避免連續重複）
  - `leading`：是否仍在前導 0 階段（前導 0 不算數字，因此不會觸發重複判斷）

---

### 2. 狀態轉移
對於當前位數 `pos`：
- `limit = tight ? s[pos] : 9`
- 遍歷 `d = 0..limit`
  - 若 `d == prev && !leading` → 跳過（避免連續數字）
  - 轉移：
    ```
    dfs(pos+1,
        tight && (d == limit),
        d,
        leading && d == 0)
    ```

---

### 3. 初始化與邊界
- `dfs(pos == s.size())` → 回傳 1（表示完成一個合法數字）。
- `dp` 初始化為 `-1` 表示未計算。

---

### 4. 最終答案
answer = solve(b) - solve(a-1)
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
 
string s;
ll dp[20][2][11];
 
ll dfs(int pos, int tight, int prev, bool leading) {
    if (pos == s.size()) return 1;
 
    if (!leading && dp[pos][tight][prev] != -1) return dp[pos][tight][prev];
 
    int limit = tight ? s[pos]-'0' : 9;
    ll res = 0;
 
    for (int d = 0; d <= limit; ++d) {
        if (d == prev && !leading) continue;
        res += dfs(pos+1,
                   tight && (d==limit),
                   d,
                   leading && d==0);
    }
 
    if (!leading) dp[pos][tight][prev] = res;
    return res;
}
 
ll solve(ll x) {
    s = to_string(x);
    memset(dp, -1, sizeof(dp));
    return dfs(0, 1, -1, true);
}
 
int main() {
    ll a, b;
    cin >> a >> b;
    cout << solve(b) - solve(a-1) << "\n";
}
```

## Increasing Subsequence II [problem](https://cses.fi/problemset/task/1748)
```markdown
題目: 

給定一個長度為 `n` 的陣列 `a`，計算陣列中所有「嚴格遞增子序列」的數量，並對 `10^9+7` 取模。
```
``` markdown
解法 : 

### 1. 狀態定義
- 使用 `bit[i]` 表示「所有結尾數值 ≤ i 的遞增子序列數量」。
- 維護一個 Fenwick Tree (BIT) 來快速計算區間和。

---

### 2. 狀態轉移
對於每個數字 `a[i]`：
1. 計算所有比它小的數字所對應的子序列數量：
sum = query(a[i] - 1)

2. 當前數字可形成新的子序列：
now = sum + 1
`+1` 是因為 `a[i]` 自己也能單獨成為一個 subsequence。

3. 更新 BIT：
update(a[i], now)

4. 將 `now` 累加到 `ans`。

---

### 3. 離散化
為了避免數值過大，先將所有 `a[i]` 做座標壓縮，讓 `a[i]` 範圍變為 `1 ~ n`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
const int MOD = 1e9+7;
 
int n;
vector<int> a, b;
int bit[200005];
 
void update(int i, int val) {
    while (i <= n) {
        bit[i] = (bit[i] + val) % MOD;
        i += i & -i;
    }
}
 
int query(int i) {
    int res = 0;
    while (i > 0) {
        res = (res + bit[i]) % MOD;
        i -= i & -i;
    }
    return res;
}
 
int main() {
    cin >> n;
    a.resize(n);
    b.resize(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        b[i] = a[i];
    }
 
    // 離散化
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    for (int i = 0; i < n; ++i) {
        a[i] = lower_bound(b.begin(), b.end(), a[i]) - b.begin() + 1;
    }
 
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        int sum = query(a[i]-1);
        int now = (sum + 1) % MOD;
        update(a[i], now);
        ans = (ans + now) % MOD;
    }
 
    cout << ans << "\n";
}
```

# Introductory Problems(24 題)
## Weird Algorithm [problem](https://cses.fi/problemset/task/1068)
``` markdown
題目:

- 給定一個 K，照著題目給的順序操作
  - 若是偶數便除 2
  - 若是奇數便乘 3 後加 1
- 輸出需要幾步會使 K 變成 1
```
``` markdown
解法:

### 1. 就照著題目說的做模擬即可
```
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
## Missing Number [problem](https://cses.fi/problemset/task/1083)
```markdown
題目: 

求序列中有哪個 1 ~ n 的元素沒有出現
```
```markdown
解法: 

因為總共是 1 ~ n 的元素，所以我們可以使用 bucket sort，也就是把一個 n + 1 長度的陣列的每
個元素都當作一個該元素有沒有出現過的 bool，最後遍歷一次整個陣列看誰還是 0 就是答案了
```
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    LL N;
    cin>>N;
 
    for(int i = 1, tmp; i < N; ++i){
        cin>>tmp;
        arr[tmp] = 1;
    } for(int i = 1; i <= N; ++i){
        if(!arr[i]){
            cout<<i;
            return 0;
        }
    }
}
```
## Repetitions [problem](https://cses.fi/problemset/task/1069)
```markdown
題目:

- 求序列中的同元素的連續區間最長是多少
```
```markdown
解法:

因為每個元素都只跟他的下一個元素有關係，如果長的一樣就將現在的連續區間長度 + 1
，如果不同，我們就將連續區間長度變回 1 並與最長的區間長度做比較，所以我們可以
在遍歷一次陣列後得到答案
```
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    string input;
    cin>>input;
 
    LL len = 0, max_len = 0;
    for(int i = 0, ch = 0; input[i]; ++i){
        if(input[i] != ch){
            max_len = max(max_len, len);
            len = 1;
            ch = input[i];
        } else{
            len++;
        }
    }
 
    cout<<max(max_len, len);
}

```

## Increasing Array [problem](https://cses.fi/problemset/task/1094)
```markdown
題目: 

求將序列變成不嚴格遞增序列的 cost

- 不嚴格遞增: 下一個元素「大於等於」前一個元素
- 嚴格遞增: 下一個元素「大於」前一個元素
```
```markdown
解法:

因為是不嚴格遞增，所以我們的每個小於的元素都只需要變成該元素前面最大的數字就好了
，若該元素大於前面的最大的元素便更新目前最大的元素
```
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    LL N; 
    cin>>N;
 
    LL ans = 0, in;
    cin >> in;
    for(int i = 1, prev = in; i < N; ++i){
        cin>>in;
        if(prev < in) {
            prev = in;            
        } else {
            ans += prev - in;
        }
 
    } cout<< ans;
}
```

## Permutations [problem](https://cses.fi/problemset/task/1070)
```markdown
題目: 

一個 1 ~ n 的所有元素的排列在沒有任何的相鄰元素差值是 1 的即是 beautiful 的，
若 input 的 n 有 beautiful permutation 請將其輸出，若無輸出 IMPOSSIBLE
```
```markdown
解法: 因為要求的排列是相鄰元素差值大於 1，可以觀察到每個奇偶數與下一個奇偶數的
差值一定是 2，所以我們只要分別照著 1 ~ n 的奇數由小到大輸出與照著偶數由小到大
輸出一次即可

需要注意的是在 n 太小的時候會有反例，因為最大的奇數跟最小的偶數的差異不夠大
如底下的 n = 3 的情況

n = 3
1 3 2 (not beautiful)
2 1 3 (not beautiful)
```
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    LL N, half_N; 
    cin>>N;
    half_N = N>>1;
    if(N == 1){
        cout << 1;
        return 0;
    } else if(N <= 3){
        cout<<"NO SOLUTION";
        return 0;
    }
 
    for(int i = 1; i <= half_N; ++i){
        cout << (i << 1) <<' ';
    } for(int i = 0; i < half_N; ++i){
        cout << ((i<<1)|1) <<' ';
    } 
    if(N & 1) cout << N;
}
```

## Number Spiral [problem](https://cses.fi/problemset/task/1071)
![image](https://hackmd.io/_uploads/HJYOMKkdxx.png)
```markdown
題目: 數字 spiral 就是上圖所示的樣子，由 1 從左上角開始一路繞圈圈，給你一個 
x, y 的座標，請你求出該座標的值為何
```
```markdown
解法: 可以觀察到，每圈都是以完全平方數結尾的，如第二圈是 4，第五圈是 25，所以
可以先推出 x, y 屬於哪一圈，接著判斷是要減回去或是直接用上一圈的值加上去

會用上一圈的最大值加上去是因為用扣得比較不直觀，如上圖的 spiral，(4,3) 這個
座標的值是 12，但你如果要從第四圈也就是 16 減回去的話要多算一整段的值，不如
從第三圈的 9 往上加直觀
```
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    LL T; cin>>T;
 
    LL x, y, biggerOne, ans;
    while(T--){
        cin>>y>>x;
        biggerOne = max(x, y);
 
        if(biggerOne & 1){
            if(biggerOne == x){
                ans = biggerOne * biggerOne;
                ans -= y - 1;
            } else {
                ans = (biggerOne-1) * (biggerOne-1);
                ans += x;
            }
        } else {
            if(biggerOne == y){
                ans = biggerOne * biggerOne;
                ans -= x - 1;
            } else {
                ans = (biggerOne-1) * (biggerOne-1);
                ans += y;
            }
        }
 
        cout << ans <<'\n';
    }
}
```

## Two Knights [problem](https://cses.fi/problemset/task/1072)
```markdown
題目: 

請算出在 n x n 的西洋棋盤上，讓兩隻 knight 不互相攻擊的擺法有幾種
```
```markdown
解法: 

首先因為 n 很大，題目的限制是 n < 1e5，所以我們不可能暴力，又因為 knight 
的走法是如下圖所示的，我們就可以用算數學計算了，首先，先算全部亂擺的方法數是 
C(n, 2)，接著把會互相攻擊的減掉即可
```
![image](https://hackmd.io/_uploads/r1JfwtJOll.png)


```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(2*(1e5))
typedef long long LL;
 
LL arr[SIZE + 1] = {};
 
int main(){
    fastio;
    LL T; cin>>T;
    
    for(LL i = 1, ans; i <= T; ++i){
        ans = (i*i) * ((i*i) - 1);
        ans >>= 1;
        ans -= ((i-1) * (i-2)) << 2;
        cout<< ans <<'\n';
    }
}
```
## Two Sets [problem](https://cses.fi/problemset/task/1092)
```markdown
題目: 

請將 1 ~ n 的數字分成總和相同的兩堆
```
```markdown
解法:

首先，我們可以先用等差數列的公式將 1 ~ n 的總和算出來，如果是奇數就代表分不出兩
堆，如果是偶數，因為填空隙要從大的開始，所以我們就可以從大的數字開始一路往下分堆
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int((1e6))
typedef long long LL;
 
LL chooseArr[SIZE + 50];
 
int main(){
    fastio;
    LL N; cin>>N;
 
    LL sum = (N*(N+1))>>1, localSum = 0, cnt = 0;
    
    if(sum & 1){
        cout << "NO";
        return 0;
    } else {
        sum >>= 1;
        cout<<"YES\n";
        for(int i = N, find = 0; !find; --i){
            if(sum - localSum <= N && !chooseArr[sum - localSum]){
                find = 1;
                cnt = N - i + 1;
                chooseArr[sum - localSum] = 1;
                break;
            }
            localSum += i;
            chooseArr[i] = 1;
        }
 
        cout << cnt << '\n';
        for(int i = 1; i <= N; ++i){
            if(chooseArr[i]){
                cout<<i<< ' ';
            }
        } cout<<'\n';
 
        cout << N - cnt << '\n';
        for(int i = 1; i <= N; ++i){
            if(!chooseArr[i]){
                cout<<i<<' ';
            }
        }
    }
}
```

## Bit Strings [problem](https://cses.fi/problemset/task/1617)
```markdown
題目: 

請問長度為 n 的 bit string 共有幾個
n = 2 的 bit string 為
00, 01, 10, 11 共 4 個
```
```markdown
解法: 首先，我們可以發現 bit string 就是由一堆 0, 1 構成的字串，且所有的 
bit string 都出現，也就是代表，所有的 bit 的 0, 1 都有出現，換句話說就是 
2^n 次方，但是用原生的 pow 會 overflow，因為 n 的最大是 1e6，所以要寫快速冪
``` 
```cpp
#include <stdio.h>
#include <iostream>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(1e6)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
LL chooseArr[SIZE + 50];
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N; cin>>N;
    cout << Pow(2, N);
}
```

## Trailing Zeros [problem](https://cses.fi/problemset/task/1618)
```markdown
題目: 請問 n! 的數字的尾巴總共有幾個 0
For example, 20!=2432902008176640000 and it has 4 trailing zeros.
```
```markdown
解法: 首先我們知道階乘是一個從 1 一路乘到 n ，那要找有幾個 trailing zero
，就需要知道有幾個 5 的因數，因為只有 5 跟 2 乘起來才會出現 0，由於 2 的出現次
數比 5 多很多，所以我們只需要統計含 5 的因數的數字出現幾次就好了
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(1e6)
#define MOD LL((1e9) + 7)
typedef long long LL;

int main(){
    fastio;
    LL N; cin>>N;
    LL ans = 0;
    for(LL i = 5; i <= N; i *= 5){
        ans += N / i;
    }
    cout << ans << '\n';
}
```

## Coin Piles [problem](https://cses.fi/problemset/task/1754)
```markdown
題目: 

你有 a, b 兩堆 coins，每次你可以做一種操作，分別是從 a 拿走一個 coin，從 b 拿
走兩個 coin，或是從 a 拿走兩個 coin，從 b 拿走一個 coin，你需要輸出是否有方法
將兩個pile 的 coin 都清空
```
```markdown
解法: 

由於他的操作是從 a 減一或是減二，b 連動著減二或是減一，那我們就可以把這兩個操作
等價成兩個二元一次方程式分別是
- x + 2y = a
- 2x + y = b
那我們只要去找這兩個方程式有沒有解，或是解是不是合理解即可，判斷的方法可以使用
克拉瑪公式配上交叉相乘來避免浮點數運算
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(1e6)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
LL chooseArr[SIZE + 50];
 
bool Cramer(int a, int b){ // fomula 1: x + 2y = a, formula 2: 2x + y = b
    LL delta = -3, deltaX = b - (a<<1), deltaY = a - (b<<1);
    if(deltaX % delta || deltaY % delta){
        return false;
    } else if(deltaX > 0 || deltaY > 0){
        return false;
    }
 
    return true;
}
 
int main(){
    fastio;
    LL T; cin >> T;
 
    LL a, b;
    while(T--){
        cin >> a >> b;
 
        cout << (Cramer(a, b) ? "YES\n" : "NO\n");
    }
}
```

## Palindrome Reorder [problem](https://cses.fi/problemset/task/1755)
```markdown
題目: 

給你一個字串，你把他要重新排列成回文字串，若可以便輸出你構造的回文字串，若不行
便輸出 NO SOLUTION
```
```markdown
解法: 

由於回文字串要是兩端的字串由外到內都是一樣的，所以我們可以得出字串中的字串最多
只有一個奇數出現的字母，若有多於一個的奇數出現的字母便是無解，若有解，便可依任意
順序由外至內構建回文字串
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(1e6)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
LL chooseArr[SIZE + 50];
 
int main(){
    fastio;
    string input;
    cin>>input;
 
    LL ch[26] = {}, odd = 0;
    for(int i = 0; input[i]; ++i){
        ch[input[i] - 'A'] ++;
    }
 
    for(int i = 0; i < 26; ++i){
        if(ch[i] & 1){
            odd++;
        }
    } if(odd > 1){
        cout << "NO SOLUTION";
    } else {
        string ans = "";
        for(int i = 0; i < 26; ++i){ //first half
            if(ch[i] & 1){
                continue;
            } else {
                for(int j = 0; (j<<1) < ch[i]; ++j){
                    ans += char('A'+i);
                }
            }
        } if(odd == 1) {
            for(int i = 0; i < 26; ++i){
                if(ch[i] & 1){
                    for(int j = 0; j < ch[i]; ++j){
                        ans += char('A' + i);
                    }
                }
            }
        } for(int i = 25; i >= 0; --i){
            if(ch[i] & 1){
                continue;
            } else {
                for(int j = 0; (j<<1) < ch[i]; ++j){
                    ans += char('A'+i);
                }
            }
        } cout<< ans;
    }
}
```


## Gray Code [problem](https://cses.fi/problemset/task/1755)
```markdown
題目: 

請輸出 n bits 的 gray code permutaion
n = 2
00
01
11
10
```
```markdown
解法: 

Gray Code 的特性是相鄰編碼只差 1 個 bit。
有一個簡單的公式可以直接從 0~2ⁿ-1 生成 Gray Code： gray=i⊕(i>>1)

原因：
i >> 1 會把數字右移，讓每個 bit 對應到「它左邊的 bit」。
XOR (^) 會標記「是否翻轉」。
如果當前位與左邊位相同 → 0
如果不同 → 1
這樣，每次 i 遞增時，只有一個 bit 會改變，符合 Gray Code 的定義。 
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(16)
#define MOD LL((1e9) + 7)
typedef long long LL;
 
bool found = false;
 
int main(){
    fastio;
    LL N; cin>>N;
    for (int i = 0; i < (1 << N); ++i) {
        int gray = i ^ (i >> 1);
        
        string bits;
        for (int j = N-1; j >= 0; --j) {
            bits += (gray & (1 << j)) ? '1' : '0';
        }
        cout << bits << '\n';
    }
}
```

## Tower of Hanoi [problem](https://cses.fi/problemset/task/1755)
```markdown
題目:

就是 tower of hanoi 的裸題
```
```markdown
解法:

要搬最大的那個盤子到底 → 先把上面的小盤子全部「暫時挪走」。
搬最大的那個盤子到目標柱子。
再把暫時挪走的小盤子搬回來。

這是一個遞迴的過程：
1. 搬 n−1 個小盤子到「輔助柱」

2. 搬第 n 個大盤子到「目標柱」

3. 搬 n−1 個小盤子到「目標柱」
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(25)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
typedef long long LL;
 
bool found = false;
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
void hanoi(int n, char A, char B, char C) {
    if(n == 1) {
        cout << A << ' ' << C<<'\n';
    }
    else {
        hanoi(n-1, A, C, B);
        hanoi(1, A, B, C);
        hanoi(n-1, B, A, C);
    }
}
 
 
int main(){
    fastio;
    int N; cin>>N;
    cout << ((1 << (N))-1)<<'\n';
    hanoi(N, '1', '2', '3');
}
```

## Creating Strings [problem](https://cses.fi/problemset/task/1622)
```markdown
題目: 

請依字典序輸出題目的字串的所有 permutaions
```
```markdown
解法: 

cpp 有個超好用 function 叫做 next_permutation，基本上就是公式解
``` 
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
 
int main() {
    string s;
    cin >> s;
    sort(s.begin(), s.end());
    vector<string> results;
    do {
        results.push_back(s);
    } while (next_permutation(s.begin(), s.end()));
    cout << results.size() << "\n";
    for (const string& str : results) {
        cout << str << "\n";
    }
    return 0;
}
```

## Apple Division [problem](https://cses.fi/problemset/task/1623)
```markdown
題目: 

請將所有的蘋果分成重量差異最小的兩堆
```
```markdown
解法: 

因為 n 只有 20，所以我們完全可以枚舉所有分法，時間複雜度就是 2^20，約等於 1e6
完全是可以算的完的

小建議:
這種 01 的枚舉可以用 bitmask 的方式來方便枚舉
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(25)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
typedef long long LL;
 
string to_group(int x){
    string ret = "";
    for(int i = 0; i < 20; ++i){
        ret += '0';
    }
 
    for(int pos = 0; x; x>>=1, pos++){
        ret[pos] = char((x&1) + '0');
    }
    return ret;
}
 
int main(){
    fastio;
    LL N; cin>>N;
    LL arr[SIZE], ans = INF, sum = 0;
    for(int i = 0; i < N; ++i){
        cin>>arr[i];
        sum += arr[i];
    }
    
    for(int i = 0; i < 1<<(N+1); ++i){
        string group = to_group(i);
        LL local_sum = 0, diff;
        for(int i = 0; i < N; ++i){
            local_sum += group[i]=='0'? arr[i]: 0;
        }
        diff = abs(sum - (local_sum<<1));
        ans = min(diff, ans);
    }
    cout << ans;
}
```

## Chessboard and Queens [problem](https://cses.fi/problemset/task/1624)
```markdown
題目: 

就是個變形的八皇后，在 input 的棋盤中有兩種格子，* 是 reserved 的，也就是不能
擺的，· 是可以擺的，其餘規則跟八皇后一模一樣
```
```markdown
解法:

棋盤大小固定 (8x8)，嘗試所有排列是可行的（最多 8! ≈ 40,320 種）。

步驟

1. 逐行放置

從第 0 列開始，每次選擇一個合法的行（列位置），並放置皇后

2. 合法性檢查

同列檢查：不能和前面放過的皇后同列

對角線檢查：abs(row1 - row2) != abs(col1 - col2)

禁止格檢查：該格不能有 *

3. 遞迴回溯

如果已經放滿 8 行 → 計數 +1

否則繼續到下一行
``` 
```cpp
#include <iostream>
#include <math.h>
#include <map>
#include <set>
#include <climits>
#include <algorithm>
#include <vector>
using namespace std;
int MOD = (long long)1e9+7;
 
int place[8], cnt;
string board[8];
 
bool valid(int Row, int Col){
	for(int i=0;i<Row;++i){
		if(place[i]==Col){
			return false;
		}
		if(abs(Row-i)==abs(place[i]-Col)){
			return false;
		}
	}return true;
}
 
void queen(int R){
	if(R==8){
		cnt++;
		return;
	}
	for(int i=0;i<8;++i){
		if(board[R][i]!='*'&&valid(R, i)){
			place[R]=i;
			queen(R+1);
		}
	}
}
 
int main(){
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
 
	for(int i=0;i<8;++i){
		cin>>board[i];
	}
	
	queen(0);
	cout<<cnt<<'\n';
}
```

## Raab Game I [problem](https://cses.fi/problemset/task/3399)
```markdown
題目: 

給定三個整數 n、a 和 b，需要構造兩個長度為 n 的排列 A 和 B
（都包含 1 ~ n 且不重複），使得：

恰好有 a 個位置 i 滿足 A[i] > B[i]

恰好有 b 個位置 i 滿足 A[i] < B[i]

其他 n - a - b 個位置 A[i] = B[i]

如果無法構造，輸出 NO；否則輸出：YES 與構造出的 A 與 B 陣列
```
```markdown
解法:


1. A 我們直接固定為升序 [1, 2, 3, ..., n]，因為題目只要求存在一組排列。

2. 要讓 B 同時滿足 a 個「比 A 小」與 b 個「比 A 大」，必要條件是： a+b≤n
否則位置不夠。

3. 我們將 B 拆成三個區段：

前 b 個 → 放最大值，確保 B[i] > A[i]

中間 n-a-b 個 → 與 A 相等

後 a 個 → 放最小值，確保 B[i] < A[i]

這樣分配後，每個數字會被精確使用一次，B 仍是合法 permutation。
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
 
void solution() {
    int n, a, b;
    cin >> n >> a >> b;
 
    if (a + b > n) {
        cout << "NO\n";
        return;
    }
 
    vector<int> A(n), B(n, 0);
    iota(A.begin(), A.end(), 1);
    set<int> used;
 
    // 中間區段：直接對應 A[i] → B[i]
    for (int i = b; i < n - a; ++i) {
        B[i] = A[i];
        used.insert(B[i]);
    }
 
    // 前 b 個：從最大值往下找沒用過的
    int high = n;
    for (int i = b - 1; i >= 0; --i) {
        while (used.count(high)) --high;
        B[i] = high;
        used.insert(high);
    }
 
    // 後 a 個：從最小值往上找沒用過的
    int low = 1;
    for (int i = n - a; i < n; ++i) {
        while (used.count(low)) ++low;
        B[i] = low;
        used.insert(low);
    }
 
    // 驗證 a, b 是否剛好滿足
    int ca = 0, cb = 0;
    for (int i = 0; i < n; ++i) {
        if (A[i] > B[i]) ++ca;
        else if (A[i] < B[i]) ++cb;
    }
    if (ca != a || cb != b) {
        cout << "NO\n";
        return;
    }
 
    cout << "YES\n";
    for (auto x : A) cout << x << ' ';
    cout << '\n';
    for (auto x : B) cout << x << ' ';
    cout << '\n';
}
 
int32_t main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int t;
    cin >> t;
    while (t--) solution();
}
```


## Mex Grid Construction [problem](https://cses.fi/problemset/task/3419)
```markdown
題目: 

給定一個整數 n，你要構造一個 n × n 的矩陣 g，其中每一列與每一行內的數字都必須
互不重複（即「列內元素唯一」和「行內元素唯一」）
```
```markdown
解法:

這題本質就是在構造一種「拉丁方（Latin Square）」：
不需要最小化數字或做任何特殊排列，只要滿足條件即可。

我們可以用貪心法：
依序填矩陣的每個格子 (i, j)，從 0 開始嘗試遞增，直到找到一個沒有被該列與該行使
用過的數字。
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    int n;
    cin >> n;
    vector<vector<int>> g(n, vector<int>(n));
    vector<set<int>> row_used(n), col_used(n);
 
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            int val = 0;
            while (row_used[i].count(val) || col_used[j].count(val)) ++val;
 
            g[i][j] = val;
            row_used[i].insert(val);
            col_used[j].insert(val);
        }
    }
 
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cout << g[i][j] << " ";
        }
        cout << "\n";
    }
}
```

## Knight Moves Grid [problem](https://cses.fi/problemset/task/3217)
```markdown
題目: 

在一個 n x n 的棋盤上，你要輸出騎士從每個格子出發到達左上角的最小步數
```
```markdown
解法: 

我們完全不需要以每個格子當作起點，既然我們的終點都是左上角的那格，那我們就以左上
角的格子作為起點，反向走回去各個格子，因為從起點到終點跟終點到起點的步數會是一樣

小建議: 

可以把棋子的所有 move 寫在一個陣列，這樣 BFS 的時候就不會有很多行在處理移動了
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE int(1e3)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<int, int> pii;
 
pii Move[8] = {{-2, -1}, {-2, 1}, {-1, 2}, {1, 2}, {2, 1}, {2, -1}, {1, -2}, {-1, -2}};
 
bool valid(pii pos, LL N){
    if(pos.f < 0 || pos.f >= N)
        return false;
    if(pos.s < 0 || pos.s >= N)
        return false;
    if(pos.f == 0 && pos.s == 0)
        return false;
    return true; 
}
 
LL board[SIZE][SIZE] = {};
 
int main(){
    fastio;
    LL N;
    cin >> N;
 
    queue<pii> q;
    q.push({0, 0});
    while(!q.empty()){
        pii v = q.front();
        q.pop();
        for(int i = 0; i < 8; ++i){
            pii new_pos = {v.f + Move[i].f, v.s + Move[i].s};
            if(valid(new_pos, N) && !board[new_pos.f][new_pos.s]){
                q.push(new_pos);
                board[new_pos.f][new_pos.s] = board[v.f][v.s] + 1;
            }
        }
    }
 
    for(int i = 0; i < N; ++i){
        for(int j = 0; j < N; ++j){
            cout << board[i][j] << ' ';
        }cout << '\n';
    }
}
```

## Grid Coloring I [problem](https://cses.fi/problemset/task/3311)
```markdown
題目:

給你一個 N × M 的棋盤，每個格子上有一個顏色，顏色是 'A' ~ 'D' 之一，你要重新
為每格上色

滿足以下條件：

新顏色不能與原本顏色相同。

新顏色不能與相鄰（上方與左方）的格子相同。

若無法滿足條件，輸出 IMPOSSIBLE。
```
```markdown
解法: 

對於每個格子 (i, j)，我們可以從 'A' 到 'D' 嘗試 4 種顏色。

依序檢查：

不能與原本顏色 board[i][j] 一樣。

不能與上方格子 draw[i-1][j] 一樣。

不能與左方格子 draw[i][j-1] 一樣。

第一個符合的顏色直接用，因為這樣的選擇永遠不會影響後面格子
（4 個顏色足夠避免衝突）。

若沒有可選顏色（雖然實際上不會發生，因為 4 個顏色一定足夠），輸出 IMPOSSIBLE。
``` 
```cpp
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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
vector<string> board;
vector<string> draw;
 
int main(){
    fastio;
    int N, M; cin >> N >> M;
 
    vector<string> board(N);
    vector<string> draw(N, string(M, 'W'));
 
    for(int i = 0; i < N; ++i)
        cin >> board[i];
 
    for(int i = 0; i < N; ++i){
        for(int j = 0; j < M; ++j){
            for(char c = 'A'; c <= 'D'; ++c){
                if(c == board[i][j]) continue; // 不能跟原色一樣
                if(i > 0 && c == draw[i-1][j]) continue; // 上方
                if(j > 0 && c == draw[i][j-1]) continue; // 左方
                draw[i][j] = c;
                break;
            }
            if(draw[i][j] == 'W'){
                cout << "IMPOSSIBLE\n";
                return 0;
            }
        }
    }
 
    for(auto &row : draw)
        cout << row << '\n';
}
```

## Digit Queries [problem](https://cses.fi/problemset/task/2431)
```markdown
題目: 

有一個無窮數列：123456789101112131415...
給你一個整數 N，你要找出數列中第 N 個數字是什麼。

例如：

N = 7 → 第 7 個數字是 7

N = 11 → 第 11 個數字是 0（因為序列到 9 後接著 10）
```
```markdown
解法: 

1. 數字長度分段
數字是這樣組成的：

1 位數：1~9 → 9 個數字 → 共 9 × 1 = 9 位

2 位數：10~99 → 90 個數字 → 共 90 × 2 = 180 位

3 位數：100~999 → 900 個數字 → 共 900 × 3 = 2700 位
... 以此類推。

所以我們要先決定第 N 個位數落在哪個「數字長度區間」。

2. 找到對應的數字
假設 N 落在 digits 位數區間：

先減去前面所有比較短的數字總長度。

用 (N-1) / digits 來算出第幾個數字。

該數字的實際值是：10^(digits-1) + (N-1) / digits

3. 取出數字中的某一位
最後 N % digits 可以知道要取該數字的第幾位。
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;

long long findDigit(long long N) {
    long long digits = 1;
    long long base = 9;

    // 找出 N 落在哪個位數區間
    while (N > digits * base) {
        N -= digits * base;
        base *= 10;
        digits++;
    }

    // 找到對應的數字
    long long num = (long long)pow(10, digits - 1) + (N - 1) / digits;

    // 取出對應的 digit (從高位開始)
    int pos = (N - 1) % digits;
    for (int i = digits - pos - 1; i > 0; --i)
        num /= 10;

    return num % 10;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int q;
    cin >> q;
    while (q--) {
        long long N;
        cin >> N;
        cout << findDigit(N) << "\n";
    }
}
```

## String Reorder [problem](https://cses.fi/problemset/task/1743)
```markdown
題目: 給定一個長度為 n 的字串 s（只包含大寫英文字母 A–Z），請你重新排列字元

要求：

字串中不能有兩個相鄰的字元相同。

如果無法達成，輸出 -1。
```
```markdown
解法: 

1. 不可能條件
如果某個字元出現次數大於 (n+1)/2，那麼不管怎麼重排，它都會有至少兩個相鄰，直接輸出 -1。

2. 構造方法
每次貪心選擇一個「和上一個字元不同」的字元，並確保剩下的字元數量仍能排完：

從 A 到 Z 依序嘗試。

減去這個字元的數量後，檢查剩下的最大頻率 maxLeft 是否 ≤ 剩餘長度的一半
（這是避免「後面一定會爆炸」的保證）。

如果不行，回溯，換下一個字元。

貪心 + 驗證
這種做法可以逐步建構一個合法解，如果失敗則輸出 -1。
``` 
```cpp
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
 
vector<string> board;
vector<string> draw;
 
int main() {
    string s; cin >> s;
    int n = s.size();
    vector<int> cnt(26, 0);
    for (char c : s) cnt[c - 'A']++;
 
    if (*max_element(cnt.begin(), cnt.end()) > (n + 1) / 2) {
        cout << -1 << '\n';
        return 0;
    }
 
    string res = "";
    char last = 0;
 
    for (int i = 0; i < n; ++i) {
        bool ok = false;
        for (int c = 0; c < 26; ++c) {
            if (cnt[c] == 0) continue;
            if (res.empty() || last != ('A' + c)) {
                // 嘗試選 c，並看後面還能不能繼續
                cnt[c]--;
                // 預判：後面最大次數不會超過剩下長度的一半
                int maxLeft = *max_element(cnt.begin(), cnt.end());
                if (maxLeft <= (n - i) / 2) {
                    res += ('A' + c);
                    last = ('A' + c);
                    ok = true;
                    break;
                }
                cnt[c]++; // 回溯
            }
        }
        if (!ok) {
            cout << -1 << '\n';
            return 0;
        }
    }
 
    cout << res << '\n';
}
```

## Grid Path Description [problem](https://cses.fi/problemset/task/1625)
```markdown
題目: 

你有一個 7×7 的棋盤，左上角是起點 (0,0)，右下角是終點 (6,0)。

你必須走滿 48 步，且每個格子只能訪問一次。

輸入字串 s 長度為 48，由字元 'U', 'D', 'L', 'R', '?' 組成：

若字元為方向，表示該步必須往該方向走。

若字元為 '?'，則該步可以選擇任意可行方向。

問總共有幾種合法路徑。
```
```markdown
解法: 

1. 暴力 DFS 會爆炸
每步最多 4 個方向，48 步理論上是 O(4^48)，必須大量剪枝。

2. 強制方向
若 s[i] != '?'，只能照指示方向走，這自然減少分支。

3. 死路剪枝 (Critical Pruning)
這是這題的精髓：

若當前位置「上下被堵住，左右卻都空著」→ 無論往哪邊走，最後一定會切斷棋盤，產生獨立區塊，無法完成路徑。

同理，若「左右被堵住，上下卻都空著」→ 同樣卡死。

這種狀況下直接返回 0，避免無謂的 DFS。

到達終點提前失敗
如果還沒走滿 48 步就到 (6,0) → 直接失敗。
如果走滿 48 步才剛好到 (6,0) → 成功。
``` 
```cpp
#include <bits/stdc++.h>
using namespace std;
 
string s;
bool vis[7][7];
 
int dx[4] = {1, 0, -1, 0};  // D R U L
int dy[4] = {0, 1, 0, -1};
char dir[4] = {'D', 'R', 'U', 'L'};
 
int dfs(int x, int y, int step) {
    if (x == 6 && y == 0) return step == 48;
    if (step >= 48) return 0;
 
    vis[x][y] = true;
    int res = 0;
 
    // 死路剪枝：上下封且左右開 => 會卡死
    if ((x == 0 || vis[x-1][y]) && (x == 6 || vis[x+1][y]) && 
        y > 0 && !vis[x][y-1] && y < 6 && !vis[x][y+1]) {
        vis[x][y] = false;
        return 0;
    }
    // 左右封且上下開 => 會卡死
    if ((y == 0 || vis[x][y-1]) && (y == 6 || vis[x][y+1]) &&
        x > 0 && !vis[x-1][y] && x < 6 && !vis[x+1][y]) {
        vis[x][y] = false;
        return 0;
    }
 
    for (int d = 0; d < 4; d++) {
        int nx = x + dx[d], ny = y + dy[d];
 
        if (nx < 0 || ny < 0 || nx >= 7 || ny >= 7 || vis[nx][ny]) continue;
 
        if (s[step] == '?' || s[step] == dir[d])
            res += dfs(nx, ny, step + 1);
    }
 
    vis[x][y] = false;
    return res;
}
 
int main() {
    cin >> s;
    cout << dfs(0, 0, 0) << '\n';
}
```

# Sorting and Searching(35 題)
## Distinct Numbers [problem](https://cses.fi/problemset/task/1621)
```markdown
題目: 

計算序列中有幾個不同的元素
```
```markdown
解法1 :
可使用 std::set 的特性，也就是 set 中只會保留唯一的元素，可以自動去重

解法2 : 
可使用 std::unorder_map，也就是用 hashing 來統計共出現了幾個不同的元素
```

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

## Apartments [problem](https://cses.fi/problemset/task/1084)
```markdown
題目: 

給你：

N 個申請人，每個人希望能租到接近其需求大小的公寓。

M 間公寓，每間公寓有實際的大小。

允許的誤差範圍 K。

要求：

一個人只能租一間公寓。

公寓的大小必須落在 [需求-K, 需求+K] 之間。

輸出：最多能成功配對多少組。
```
```markdown
解法: 
1. 先將申請人需求的陣列排序。

將所有 公寓大小 存進 multiset，方便用 lower_bound 查詢。

2. 依序遍歷每個申請人，對每個需求：

計算能接受的最小公寓大小 low = arr[i] - K。

使用 multiset.lower_bound(low) 找到第一個 不小於 low 的公寓。

檢查該公寓是否 ≤ arr[i] + K，若是則分配，並從 multiset 中刪掉該公寓。

否則該申請人無法配對。

這樣能確保每個申請人都拿到「最小可行的公寓」，避免浪費大公寓。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N, M, K;
    cin >> N >> M >> K;
    
    vector<LL> arr(N);
    multiset<LL> ms;
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } sort(arr.begin(), arr.end());
 
    for(int i = 0; i < M; ++i){
        LL num; cin >> num;
        ms.insert(num);
    }
 
    LL ans = 0;
    for(int i = 0; i < N; ++i){
        LL low = arr[i] - K, high = arr[i] + K;
        auto it = ms.lower_bound(low);
        if(it != ms.end()){
            if(*it <= high){
                ans++;
                ms.erase(it);
            }
        } 
    } cout << ans;
}
```

## Ferris Wheel [problem](https://cses.fi/problemset/task/1090)
```markdown
題目: 

給你：

N 個要搭 gondola 的小孩的體重。

要求：

不能超過一艘 gondola 的載重 X

一艘 gondola 可以載一個或兩個小孩

輸出：最少能幾趟載完所有人。
```
```markdown
解法: 

1. 將所有數字存進 multiset（取負號）
透過 -num，讓 multiset 內部可以 由大到小排序（因為 multiset 預設是遞增順序）。

2. 每次取最大元素作為主元素
從 multiset 中取出目前最大的數字（因為取的是 -num，其實是最小的負數）。

3. 嘗試搭配次元素

假設目前取出的數字是 x，要找一個 y 使得 x + y ≤ M。

這裡的 lower_bound(-(M + begin)) 其實就是在找 能與 x 搭配且不超過限制的最大 y。

成功配對 → 移除兩個元素

如果找到合適的 y，將其從 multiset 中移除。

不管是否成功配對，都算一次操作（因為即使 x 找不到 y，也會被單獨消耗掉）。

重複直到 multiset 空

每次處理完一個最大元素，繼續處理下一個。

最後 ans 計算總共完成了多少組。

小技巧:
可以用負值來讓這些預設為升序排列的 STL 變成降序排列的
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    multiset<LL> ms;
    for(int i = 0; i < N; ++i){
        LL tmp; cin >> tmp;
        ms.insert(-tmp);
    }
 
    LL ans = 0;
    for(int i = 0; i < N && !ms.empty(); ++i){
        LL begin = *(ms.begin());
        ms.erase(ms.begin());
        auto it = ms.lower_bound(-(M + begin));
 
        if(it != ms.end()){
            ms.erase(it);
        }
        ans ++;
    }
    cout << ans;
}
```

## Concert Tickets [problem](https://cses.fi/problemset/task/1091)
```markdown
題目: 

給你：

N 張 concert 的票的價格。

Q 個 query: 

每個顧客會有個心目中的價格上限 K

你要找出最接近但不超過 K 的票給那個顧客

若有票輸出那張票的價格，若沒有，輸出 -1
```
```markdown
解法: 

1. 用 multiset 儲存所有數字（取負號）

將每個輸入的數字 tmp 存成 -tmp。

這樣 multiset 內部會依照「由大到小」的邏輯排序（因為 multiset 預設是遞增）。

2. 處理每個查詢 query

我們要找到「不大於 query 的最大數字」。

因為數字是以負號存放，所以要找 lower_bound(-query)：

-query 會找到「第一個大於等於 -query」的負數。

這其實對應到「不大於 query 的最大正數」。

3. 輸出與刪除

如果找到符合的數字：

印出 -(*it)（轉回正數）。

把它從 multiset 移除，避免重複使用。

如果找不到（it == ms.end()）：

印出 -1。

小技巧:
可以用負值來讓這些預設為升序排列的 STL 變成降序排列的
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    multiset<LL> ms;
 
    for(int i = 0; i < N; ++i){
        LL tmp; cin>>tmp;
        ms.insert(-tmp);
    }
 
    while(M--){
        LL query;
        cin >> query;
        if(ms.empty()){
            cout << -1 << '\n';
            continue;
        }
 
        auto it = ms.lower_bound(-query);
        if(it == ms.end()){
            cout << -1 << '\n';
        } else{
            cout << -(*it) << '\n';
            ms.erase(it);
        }
    }
}
```

## Restaurant Customers  [problem](https://cses.fi/problemset/task/1619)
```markdown
題目: 

給你：

N 個顧客的用餐的時間。

輸出最多同時在餐廳的人數
```
```markdown
解法: 

1. 用 map<LL, LL> 做時間事件紀錄，因為這題的數字很大，不能用常規差分來做

table[start]++：在 start 時刻，人數 +1。

table[end]--：在 end 時刻，人數 -1。

這個 map 會自動按照 key（時間點）排序。

2. 線性掃描所有時間點

宣告 hooman = 0（目前人數）。

依序遍歷 table：

將 hooman 加上這個時間點的變化量（可能是 +1 或 -1）。

不斷更新 ans = max(ans, hooman) 來記錄目前遇到的最大人數。

3. 輸出結果

最後 ans 就是同時存在的最大人數。
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N;
    cin >> N;
    LL ans = 0, hooman = 0;
    map<LL, LL> table;
    for(int i = 0; i < N; ++i){
        LL start, end;
        cin >> start >> end;
        table[start] ++;
        table[end] --;
    }
 
    for(auto e : table){
        hooman += e.s;
        ans = max(ans, hooman);
    } cout << ans << '\n';
}
```

## Movie Festival  [problem](https://cses.fi/problemset/task/1629)
```markdown
題目: 

在一個電影節，總共有 n 部電影

每部電影有自己的放映區間 (a, b)

你要輸出在時間不重疊的情況下可以看到幾部電影
```
```markdown
解法: 

1. 讀取所有區間：先把每個區間記錄成 (L, R)。

2. 排序：

先依照 L（起點）遞增排序；

若 L 相同，再依照 R（終點）遞減排序。
這樣可以確保相同起點時，先處理「範圍大的區間」，避免先被短的截斷。

3. 遍歷區間：

用 maxR 記錄「目前已經選的區間」的右端點。

每遇到一個新區間：

如果它不和前面選的重疊（L >= maxR）：選它，cnt++ 並更新 maxR。

如果它和前面重疊（L < maxR）：
→ 把 maxR 改成「更短的結尾」，也就是 R 比 maxR 小的那個，這樣能保留更多空間給後面可能的區間。

更新答案：ans = max(ans, cnt) 追蹤目前最多能選的數量。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
bool cmp(pLL a, pLL b){
    return (a.f == b.f) ? a.s > b.s : a.f < b.f;
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
    
    vector<pLL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i].f >> arr[i].s;
    }
 
    sort(arr.begin(), arr.end());
    
    LL maxR = -1, cnt = 0, ans = 0;
    for(int i = 0; i < N; ++i){
        if(maxR <= arr[i].f){
            maxR = arr[i].s;
            cnt++;
        } else {
            if(arr[i].s < maxR){
                maxR = arr[i].s;
            }
        } ans = max(cnt, ans);
    } cout << ans;
}
```

## Sum of Two Values [problem](https://cses.fi/problemset/task/1640)
```markdown
題目: 

你有一個長度為 N 的陣列 arr。

你需要找出兩個不同的元素 arr[i] 和 arr[j]，使得：

arr[i]+arr[j]=M

並輸出這兩個元素的索引（1-based）。

如果沒有這樣的組合，輸出 "IMPOSSIBLE"。
```
```markdown
解法: 

1. 頻率表：先把所有數字記錄下來，知道每個數字出現幾次。

2. 枚舉每個元素：依序看每個數字 x，計算它需要的搭檔 M - x。

3. 檢查是否能配對：

如果搭檔的數字存在，而且：

它跟 x 是不同的數字，或

它跟 x 相同但數量至少 2
→ 那就能配對成功。

找出對應的另一個數字：一旦確定有配對，就去找到這個搭檔，並直接輸出兩個數字的位置。

沒有配對則輸出 "IMPOSSIBLE"：如果所有數字都檢查完了，還是找不到符合的組合，就輸出不可能。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE 2*int(1e5)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<int, int> pii;
LL arr[SIZE];
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    map<int, int> m;
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
        m[arr[i]]++;
    }
 
    for(int i = 0; i < N; ++i){
        LL diff = M - arr[i], cnt = m[diff];
        if(cnt > 1 || (cnt == 1 && diff != arr[i])){
            cout << i + 1 << ' ';
            for(int j = 0; j < N; ++j){
                if(arr[j] == diff && j!=i){
                    cout << j + 1 << '\n';
                    return 0;
                }
            }
        }
    }
 
    cout << "IMPOSSIBLE";
}
```

## Maximum Subarray Sum [problem](https://cses.fi/problemset/task/1643)
```markdown
題目: 

給定一個長度為 n 的整數序列，請找出其中的最大子陣列和（連續子陣列的總和最大值）。
```
```markdown
解法: 

1. 使用 Kadane’s Algorithm：
   - 維護一個目前的區段總和 localSum，以及全域最大總和 maxSum。
   
2. 遍歷序列：
   - 若 localSum + 當前數字 > 0：累加到 localSum，並更新 maxSum。
   - 否則：重置 localSum = 0，並用當前數字更新 maxSum（處理全負數情況）。

3. 最終輸出 maxSum：
   - 即為最大子陣列和。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE 2*int(1e5)
#define INF INT_MAX
typedef long long LL;
 
LL arr[SIZE];
 
int main(){
    fastio;
    LL N;
    cin >> N;
    LL localSum = 0, maxSum = -INF;
    while(N--){
        LL num; cin >> num;
        if(localSum + num > 0){
            localSum += num;
            maxSum = max(maxSum, localSum);
        } else {
            localSum = 0;
            maxSum = max(maxSum, num);
        }
    }
    cout << maxSum << '\n';
}
```

## Stick Lengths [problem](https://cses.fi/problemset/task/1074)
```markdown
題目: 

給定 n 個整數，請找出一個高度 H，使得所有元素調整到 H 的總成本（|arr[i] - H| 的總和）最小。
並輸出這個最小成本。
```
```markdown
解法: 

1. 排序：
   - 先將陣列 arr 排序，因為 |arr[i] - H| 的總和在排序後有「中位數最小化絕對差」的性質。

2. 中位數性質：
   - 當成本定義為絕對值差距時，最小成本一定在中位數（或偶數長度時的兩個中位數之一）。
   - 因此，直接取：
     - 若 N 為奇數：選中位數。
     - 若 N 為偶數：檢查兩個中位數，計算各自的成本，取較小者。

3. 計算成本：
   - 對選定的 H，計算 Σ |arr[i] - H|。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N);
    for(int i = 0; i < N; ++i) cin >> arr[i];
    sort(arr.begin(), arr.end());

    auto cost = [&](LL h) {
        LL res = 0;
        for (LL v : arr) res += abs(v - h);
        return res;
    };

    LL ans;
    if (N % 2 == 1) {
        ans = cost(arr[N / 2]);
    } else {
        ans = min(cost(arr[N / 2]), cost(arr[N / 2 - 1]));
    }

    cout << ans << '\n';
}
```

## Missing Coin Sum [problem](https://cses.fi/problemset/task/2183)
```markdown
題目: 

給定 n 個整數，請找出一個高度 H，使得所有元素調整到 H 的總成本（|arr[i] - H| 的總和）最小。
並輸出這個最小成本。
```
```markdown
解法: 

1. 排序：
   - 先將所有硬幣按照面值遞增排序。
   - 這樣可以保證我們能夠從小到大逐步確認哪些金額可以被湊出。

2. 貪心思路：
   - 設一個變數 res，表示目前能夠湊出的「連續金額區間」的上界（初始為 1）。
   - 對於每個硬幣 coins[i]：
     - 若 coins[i] ≤ res，代表這個硬幣能幫助我們把可湊範圍往後擴展，更新 res += coins[i]。
     - 若 coins[i] > res，代表出現了斷層，我們無法湊出 res 這個金額，因此答案就是 res。

3. 輸出答案：
   - 當遍歷完所有硬幣，res 就是最小不能被湊出的金額。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    int n;
    cin >> n;
    vector<long long> coins(n);
    for (auto& x : coins) cin >> x;
    sort(coins.begin(), coins.end());
 
    long long res = 1;
    for (int i = 0; i < n; i++) {
        if (coins[i] > res) break;
        res += coins[i];
    }
    cout << res << endl;
}
```

## Collecting Numbers [problem](https://cses.fi/problemset/task/2183)
```markdown
題目: 

給定 1 到 N 的一個排列，你需要計算「最少需要幾輪」才能把數字按照遞增順序分組完成。  
一輪的概念：如果數字 i 出現在 i-1 的後面，就可以跟前一輪延續；  
否則需要開啟新的一輪。
```
```markdown
解法: 

1. 讀取輸入：
   - 讀取 N，並建立一個長度 N+1 的陣列 arr。
   - arr[x] 代表數字 x 在原序列中的位置。

2. 建立位置對應：
   - 我們讀入數字的同時，記錄它在原排列中的位置。
   - 例如：若輸入排列為 [4, 2, 1, 3]
     → arr[4] = 1, arr[2] = 2, arr[1] = 3, arr[3] = 4。

3. 計算「回合數」：
   - 初始化 round = 1。
   - 從 2 走到 N：
     - 如果 arr[i] < arr[i-1]，代表數字 i 出現在 i-1 的前面，序列被「斷開」→ 需要新的一輪。
     - 否則，沿用同一輪。

4. 輸出答案：
   - 最後的 round 即為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        LL num; cin >> num;
        arr[num] = i;
    }

    LL round = 1;
    for (int i = 2; i <= N; ++i) {
        if (arr[i] < arr[i-1])
            round++;
    }
    cout << round;
}
```

## Collecting Numbers II [problem](https://cses.fi/problemset/task/2217)
```markdown
題目: 

給定一個 1 到 N 的排列，以及 M 次 swap 操作。  
每次操作交換兩個位置的數字，並在每次交換後輸出「最少需要幾輪」才能將數字 1~N 依序分組完成。  

一輪的概念：如果數字 i 出現在 i-1 的後面，就可以跟前一輪延續；  
否則需要開啟新的一輪。
```
```markdown
解法: 

1. 建立兩個映射：
   - `indexValue[i]`: 位置 i 的數字
   - `valueIndex[v]`: 數字 v 在排列中的位置  
   這樣能快速查詢「某數字在哪裡」和「某位置是什麼數字」。

2. 計算初始 round：
   - 遍歷 2 到 N，若 valueIndex[i] < valueIndex[i-1] → 代表序列斷開 → round++。

3. 觀察 swap 的影響：
   - 一次 swap 只會影響到少數幾個「鄰近關係」：
     - 被 swap 的兩個值 (valueA, valueB)
     - 以及它們各自的前一個值 (valueA-1, valueB-1)  
     因為只有這些數字的相對順序可能改變「斷點」。

4. 更新 round：
   - 在 swap 前，計算這些受影響的數字對是否形成斷點。
   - swap 後，更新 indexValue 與 valueIndex。
   - 再重新計算這些數字對的斷點數量。
   - round += (after - before)。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<int> indexValue(n + 1);     // index -> value
    vector<int> valueIndex(n + 1);     // value -> index

    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        indexValue[i] = x;
        valueIndex[x] = i;
    }

    int round = 1;
    for (int i = 2; i <= n; ++i) {
        if (valueIndex[i] < valueIndex[i - 1]) round++;
    }

    while (m--) {
        int a, b;
        cin >> a >> b;
        a--, b--;

        int valueA = indexValue[a];
        int valueB = indexValue[b];

        set<int> affected = {valueA - 1, valueA, valueB - 1, valueB};

        auto is_break = [&](int x) -> bool {
            if (x < 1 || x >= n) return false;
            return valueIndex[x] > valueIndex[x + 1];
        };

        int before = 0, after = 0;
        for (int x : affected) before += is_break(x);

        // swap values and update position mapping
        swap(indexValue[a], indexValue[b]);
        swap(valueIndex[valueA], valueIndex[valueB]);

        for (int x : affected) after += is_break(x);

        round += (after - before);
        cout << round << '\n';
    }
}
```

## Playlist [problem](https://cses.fi/problemset/task/1141)
```markdown
題目: 

給定一個長度為 N 的陣列，請找出最長的不重複子陣列（Longest Unique Subarray）的長度。
```
```markdown
解法: 

1. 使用 map 紀錄每個數字最後一次出現的位置：
   - `m[val]` 代表數字 val 上次出現的 index。

2. 維護 sliding window：
   - `tail`: 目前子陣列的左邊界。
   - `curLen`: 目前子陣列的長度。
   - `maxLen`: 最長不重複子陣列的長度。

3. 迭代陣列：
   - 若 arr[i] 曾出現過且 m[arr[i]] >= tail → 出現重複，更新 tail = m[arr[i]] + 1，並重新計
   算 curLen。
   - 否則，將 curLen 加 1。
   - 更新 m[arr[i]] = i，最後更新 maxLen。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }

    LL curLen = 0, maxLen = 0, tail = 0;
    map<LL, LL> m;

    for (int i = 1; i <= N; ++i) {
        if (m[arr[i]] && m[arr[i]] >= tail) {
            // 發現重複，移動 tail
            curLen = i - m[arr[i]];
            tail = m[arr[i]] + 1;
        } else {
            curLen++;
        }
        m[arr[i]] = i;
        maxLen = max(maxLen, curLen);
    }
    cout << maxLen;
}
```

## Towers [problem](https://cses.fi/problemset/task/1073)
```markdown
題目: 

給定 N 個方塊，每個方塊有大小，必須依序處理。
你可以將一個方塊放到某個塔頂（前提是塔頂的方塊比它大），或者開一個新塔。
請問最少需要幾座塔？
```
```markdown
解法: 

1. **轉換成最長非遞減子序列 (LNDS) 問題**  
   - 每一個塔的頂端就是一個「序列的開頭」。  
   - 由於每個塔內的方塊必須嚴格遞減，反過來看就等於要找最長的非遞減序列數量。  
   - 最少的塔數即等於 LNDS 的長度。

2. **LIS (Longest Increasing Subsequence) 實作**  
   - 使用一個 dp 陣列維護塔的頂端（實際上是非遞減序列的最後元素）。  
   - 對於每個方塊 x：
     - 使用 upper_bound(dp, x) 尋找第一個大於 x 的位置：
       - 如果找到 → 取代該位置的元素。
       - 否則 → 將 x 加入 dp 末尾。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
 
    vector<LL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } 
 
    LL ans = LIS(arr);
    cout << ans;
}
```

## Traffic Lights [problem](https://cses.fi/problemset/task/1163)
```markdown
題目: 

有一條長度為 N 的線段，初始時沒有切割點。  
接著有 Q 次操作，每次會在某個位置切割這條線段，並輸出當前所有線段中最長線段的長度。
```
```markdown
解法: 

1. 資料結構設計
   - points（multiset）：用來儲存所有切割點（包含 0 和 N）。
   - segment（multiset）：用來儲存目前所有線段的長度。

2. 流程
   1. 初始時：
      - 在 points 中插入 0 和 N。
      - 在 segment 中插入 N（整條線段）。
   2. 每次切割時：
      - 找到切割點 pos 左右的分割點 lPoint 和 rPoint：
        - lPoint = prev(points.lower_bound(pos))
        - rPoint = *(points.lower_bound(pos))
      - 從 segment 中移除原本的區段長度 (rPoint - lPoint)入新的兩段長度：
        - pos - lPoint
        - Point - pos
      - 將 pos 插入到 points。
      - 取 segment 中的最大值輸出。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
 
    vector<LL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } 
 
    LL ans = LIS(arr);
    cout << ans;
}
```

## Distinct Values Subarrays [problem](https://cses.fi/problemset/task/3420)
```markdown
題目: 

給定一個長度為 `N` 的陣列，請計算 **所有子陣列中「不含重複元素」的子陣列總數**。
```
``` markdown
解法: 

1. **使用雙指針（Sliding Window）**
   - `l`：子陣列左邊界。
   - `r`：子陣列右邊界（從 1 走到 N）。

2. **使用 map 紀錄元素最後出現的位置**
   - `m[val]`：元素 `val` 最後一次出現的索引。

3. **演算法流程**
   - 依序遍歷陣列 `r = 1 → N`：
     1. 如果 `arr[r]` 曾出現過且 `m[arr[r]] >= l`，代表有重複元素。
        - 將 `l` 移動到 `m[arr[r]] + 1`，確保當前子陣列不重複。
     2. 更新 `m[arr[r]] = r`。
     3. 將目前不重複子陣列的數量加入 `ans`：
        - 每次新增的子陣列數量 = `r - l + 1`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;
    
    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }
    
    LL ans = 0;
    map<LL, LL> m;
    
    for (int r = 1, l = 1; r <= N; ++r) {
        if (m[arr[r]] >= l) {
            l = m[arr[r]] + 1; // 移動左邊界
        }
        m[arr[r]] = r;         // 更新元素最後出現位置
        ans += r - l + 1;      // 新增的子陣列數量
    }
    
    cout << ans;
}
```

## Distinct Values Subsequences [problem](https://cses.fi/problemset/task/3421)
```markdown
題目: 

給定一個長度為 `N` 的陣列，請計算所有「非空子集」的數量，其中陣列中的重複元素視為可區分的，但最終
結果對 `10^9+7` 取模。
```
``` markdown
解法: 

1. **統計每個數字的出現次數**
   - 使用 `unordered_map<int, int> freq` 來紀錄每個元素的出現次數。

2. **子集計算公式**
   - 對於出現次數為 `k` 的元素，它可以被選擇 `0 ~ k` 次。
   - 對應的組合數量為 `k + 1`（包含不選）。
   - 對所有元素的結果相乘

3. **排除空集**
   - 上述計算包含「全部不選」的情況，需要減去 1。

4. **模運算**
   - 由於數字可能非常大，對每一步運算取 `MOD = 1e9 + 7`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;

// FastIO
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}

int main() {
    fastio();
    int n;
    cin >> n;
    vector<int> a(n);
    unordered_map<int, int> freq;

    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        freq[a[i]]++;
    }

    long long ans = 1;
    for (auto &p : freq) {
        ans = ans * (p.second + 1) % MOD; // 每個元素有 (count+1) 種選擇
    }

    ans = (ans - 1 + MOD) % MOD; // 減去空集

    cout << ans << '\n';
    return 0;
}
```

## Josephus Problem I [problem](https://cses.fi/problemset/task/2162)
```markdown
題目: 

給定一個整數 `n`，請模擬 **約瑟夫問題 (Josephus Problem)**，即每次移除隊列中的第 `k` 個人
（本例中 `k = 1`），並輸出所有被移除的順序。
```
``` markdown
解法1 : 

原始程式使用了 `__gnu_pbds::tree` 作為 `ordered_set` 來支援以下操作：
- `find_by_order(k)`: 取得集合中第 `k` 個元素 (0-based)。
- `erase(it)`: 移除該元素。

解法2 :
PBDS 雖然方便，但可能不支援部分編譯環境。我們可以用 **BIT** 來手動模擬順序刪除。

1. 建立一個長度為 `n` 的 BIT，初始每個位置為 `1`，表示該人仍存在。
2. 每次刪除第 `k` 個人：
   - 用 `find_kth(k)` 在 BIT 中找到第 `k` 個存活者的位置。
   - 將該位置更新為 `0`，表示刪除。
3. 每次刪除後，更新當前指標位置，繼續進行直到所有人被刪光。
```

``` cpp
解法1
#include <iostream> 
using namespace std; 
#include <ext/pb_ds/assoc_container.hpp> 
using namespace __gnu_pbds; 

#define ordered_set tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> 

int main() {
    int n, k = 1;
    cin >> n;
    ordered_set os;
    for (int i = 1; i <= n; i++) {
        os.insert(i);
    }

    int cur = 0;
    for (int i = 1; i <= n; i++) {
        cur = (cur + k) % os.size();
        auto it = os.find_by_order(cur);
        cout << *it << " ";
        os.erase(it);
    }
    return 0;
}
```
``` cpp
解法2
#include <bits/stdc++.h>
using namespace std;

struct BIT {
    int n;
    vector<int> bit;
    BIT(int n): n(n), bit(n + 1, 0) {}
    
    void update(int i, int delta) {
        for (; i <= n; i += i & -i) bit[i] += delta;
    }
    
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & -i) sum += bit[i];
        return sum;
    }
    
    int find_kth(int k) { // 找到第 k 個存活者的位置
        int pos = 0;
        int mask = 1 << (31 - __builtin_clz(n));
        for (; mask > 0; mask >>= 1) {
            int nxt = pos + mask;
            if (nxt <= n && bit[nxt] < k) {
                k -= bit[nxt];
                pos = nxt;
            }
        }
        return pos + 1;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k = 1;
    cin >> n;

    BIT bit(n);
    for (int i = 1; i <= n; ++i) bit.update(i, 1);

    int cur = 0;
    for (int i = 1; i <= n; ++i) {
        int remaining = n - i + 1;
        cur = (cur + k) % remaining;
        if (cur == 0) cur = remaining;
        int pos = bit.find_kth(cur);
        cout << pos << " ";
        bit.update(pos, -1);
        cur--; // 下一輪從刪掉的後一位開始
    }
}
```

## Josephus Problem II [problem](https://cses.fi/problemset/task/2163)
```markdown
題目: 

給定一個整數 `n`，請模擬 **約瑟夫問題 (Josephus Problem)**，即每次移除隊列中的第 `k` 個人
（本例中 `k = 任意數`），並輸出所有被移除的順序。
```
``` markdown
解法 : 

1. **BIT (Fenwick Tree) 模擬順序統計樹**：
   - `insert(x)`：將編號 `x` 標記為存活。
   - `erase(x)`：移除編號 `x`。
   - `find_by_order(k)`：找到目前第 `k` 個存活的人。
   - `size()`：回傳目前存活的人數。

2. **Josephus 主邏輯**：
   - 使用變數 `curr` 記錄當前的相對位置。
   - 每一輪：
     ```cpp
     k = (curr + K - 1) % rem + 1
     ```
     - `curr`：前一輪的位置。
     - `K`：每次要往前數的人數。
     - `rem`：目前剩下的人數。
     - `% rem` 處理環狀結構。
   - 用 `find_by_order(k)` 找到第 `k` 個存活的人，輸出並刪除。
   - 更新 `curr = k`，準備下一輪。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

class OST {
    vector<int> BIT;
    int MAX_VAL;

    void update(int i, int add) {
        while (i > 0 && i < (int)BIT.size()) {
            BIT[i] += add;
            i += i & -i;
        }
    }

    int sum(int i) {
        int ans = 0;
        while (i > 0) {
            ans += BIT[i];
            i -= i & -i;
        }
        return ans;
    }

public:
    OST(int val) {
        MAX_VAL = val;
        BIT.assign(MAX_VAL, 0);
    }

    void insert(int x) {
        if (x <= 0 || x >= (int)BIT.size()) return;
        update(x, 1);
    }

    void erase(int x) {
        if (!find(x)) return;
        update(x, -1);
    }

    bool find(int x) {
        if (x <= 0 || x >= (int)BIT.size()) return false;
        return sum(x) - sum(x - 1) > 0;
    }

    int order_of_key(int x) {
        if (x <= 0) return 0;
        if (x >= (int)BIT.size()) return sum(BIT.size() - 1);
        return sum(x);
    }

    int find_by_order(int k) { // 找第 k 個存活的人
        int l = 0, h = BIT.size();
        while (l < h) {
            int mid = (l + h) / 2;
            if (k <= sum(mid))
                h = mid;
            else
                l = mid + 1;
        }
        return l;
    }

    int size() {
        return sum(BIT.size() - 1);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, K;
    cin >> n >> K;

    OST s(n + 1);
    for (int i = 1; i <= n; i++) s.insert(i);

    int curr = 1;
    for (int i = 0; i < n; i++) {
        int rem = n - i;
        int k = (curr + K - 1) % rem + 1;
        int val = s.find_by_order(k);
        s.erase(val);
        cout << val << " ";
        curr = k;
    }
}
```

## Nested Ranges Check [problem](https://cses.fi/problemset/task/2168)
```markdown
題目: 

給定 `n` 個區間，每個區間有左右端點 `(l, r)`，需要判斷：
1. 每個區間是否 **被其他區間包含**。
2. 每個區間是否 **包含其他區間**。

輸出兩行：
- 第一行：每個區間是否包含其他區間（是為 1，否為 0）。
- 第二行：每個區間是否被其他區間包含（是為 1，否為 0）。

```
``` markdown
解法 : 

1. 區間排序
- 將所有區間依照：
  1. **左端點遞增排序**
  2. 左端點相同時，**右端點遞減排序**（較大的區間優先）

這樣能確保：
- 從左到右掃描：若 `r <= maxR`，該區間被包含。
- 從右到左掃描：若 `r >= minR`，該區間包含其他區間。

2. 演算法流程
    1. 讀入 `n` 個區間 `(l, r)` 並記錄原始索引。
    2. 排序後，建立：
       - `included[i]`: 是否被其他區間包含。
       - `includes[i]`: 是否包含其他區間。
    3. 從左到右：
       - 維護 `maxR`，若 `r <= maxR` → `included[i] = 1`
    4. 從右到左：
       - 維護 `minR`，若 `r >= minR` → `includes[i] = 1`

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int main() {
    fastio;
    int n;
    cin >> n;
    vector<pair<pair<int, int>, int>> ranges(n); // {{l, r}, original index}

    for (int i = 0; i < n; ++i) {
        int l, r;
        cin >> l >> r;
        ranges[i] = {{l, r}, i};
    }

    // 排序：左端點升序，右端點降序
    sort(ranges.begin(), ranges.end(), [](auto &a, auto &b) {
        if (a.first.first == b.first.first)
            return a.first.second > b.first.second;
        return a.first.first < b.first.first;
    });

    vector<int> includes(n), included(n);

    // 被包含者：從左往右掃
    int maxR = 0;
    for (int i = 0; i < n; ++i) {
        auto [l, r] = ranges[i].first;
        int idx = ranges[i].second;
        if (r <= maxR) included[idx] = 1;
        maxR = max(maxR, r);
    }

    // 包含者：從右往左掃
    int minR = INT_MAX;
    for (int i = n - 1; i >= 0; --i) {
        auto [l, r] = ranges[i].first;
        int idx = ranges[i].second;
        if (r >= minR) includes[idx] = 1;
        minR = min(minR, r);
    }

    for (int x : includes) cout << x << ' ';
    cout << '\n';
    for (int x : included) cout << x << ' ';
    cout << '\n';
}
```

## Nested Ranges Count [problem](https://cses.fi/problemset/task/2169)
```markdown
題目: 

給定 `n` 個區間，每個區間有左右端點 `(l, r)`，需要輸出：
1. 每個區間 **包含多少個其他區間**。
2. 每個區間 **被多少個其他區間包含**。

輸出兩行：
- 第一行：每個區間包含的區間數。
- 第二行：每個區間被包含的區間數。

```
``` markdown
解法 : 

1. 排序
- 先將所有區間依照以下規則排序：
  1. **左端點遞增**
  2. 若左端點相同 → **右端點遞減**（較大的區間優先）

這樣能確保在遍歷時，較大的區間會優先被處理，利於 BIT（Fenwick Tree）更新與查詢。

2. Fenwick Tree（BIT）
使用 BIT 來支援「前綴計數」：
- `add(x)`: 將位置 `x` 的計數 +1。
- `sum(x)`: 查詢 `[1, x]` 的計數總和。

為了使用 BIT，需要將右端點 `r` 進行 **座標壓縮**，避免直接用大數字當索引。

3. 演算法流程
    1. 讀入所有區間 `(l, r)`，並記錄原始索引。
    2. 對區間依規則排序。
    3. 建立 BIT 並處理兩個方向：
       - **計算包含數 (`contains`)：**
         - 從右到左遍歷。
         - 查詢 BIT 中右端點 ≤ 當前區間的數量 → 代表該區間可包含這些區間。
         - 將該區間右端點加入 BIT。
       - **計算被包含數 (`contained`)：**
         - 清空 BIT。
         - 從左到右遍歷。
         - 查詢 BIT 中右端點 < 當前區間的數量 → 計算被包含數。
         - 將該區間右端點加入 BIT。
         
4. 輸出結果。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

struct Interval {
    int l, r, idx;
};

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n;
    cin >> n;
    vector<Interval> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i].l >> a[i].r;
        a[i].idx = i;
    }

    // 1. 排序：左端點升序，右端點降序
    sort(a.begin(), a.end(), [](Interval &x, Interval &y) {
        if (x.l != y.l) return x.l < y.l;
        return x.r > y.r;
    });

    vector<int> contains(n), contained(n);
    vector<int> bit(n + 2);

    auto add = [&](int x) {
        for (; x < bit.size(); x += x & -x) bit[x]++;
    };
    auto sum = [&](int x) {
        int res = 0;
        for (; x > 0; x -= x & -x) res += bit[x];
        return res;
    };

    // 2. 座標壓縮 (右端點)
    vector<int> r_sorted;
    for (auto &it : a) r_sorted.push_back(it.r);
    sort(r_sorted.begin(), r_sorted.end());
    r_sorted.erase(unique(r_sorted.begin(), r_sorted.end()), r_sorted.end());

    auto get_r = [&](int r) {
        return lower_bound(r_sorted.begin(), r_sorted.end(), r) - r_sorted.begin() + 1;
    };

    // 3. 計算包含數 (右到左)
    for (int i = n - 1; i >= 0; i--) {
        int pos = get_r(a[i].r);
        contains[a[i].idx] = sum(pos);
        add(pos);
    }

    // 4. 計算被包含數 (左到右)
    fill(bit.begin(), bit.end(), 0);
    for (int i = 0; i < n; i++) {
        int pos = get_r(a[i].r);
        contained[a[i].idx] = i - sum(pos - 1);
        add(pos);
    }

    // 5. 輸出結果
    for (auto x : contains) cout << x << " ";
    cout << "\n";
    for (auto x : contained) cout << x << " ";
    cout << "\n";
}
```

## Room Allocation [problem](https://cses.fi/problemset/task/1164)
```markdown
題目: 

有 `n` 個顧客要入住飯店，每位顧客有：
- 到達時間 `arrive`
- 離開時間 `departure`

需要安排最少的房間數，並輸出：
1. 飯店所需的總房間數。
2. 每位顧客分配到的房號。
```
``` markdown
解法 : 

1. 事件排序
- 先將所有顧客依照到達時間 `arrive` 遞增排序，若相同則不特別處理，因為房間分配只看優先順序。

2. 優先佇列 (Priority Queue)
使用 **最大堆 (priority_queue)**，但存負的 `departure` 以模擬最小堆：
- 每個元素為 `{-離開時間, 房號}`。
- 佇列頂端的元素代表「最早可釋放的房間」。

3. 房間分配流程
    1. 初始化 `roomCnt = 0` 表示目前使用的房間數。
    2. 對每位顧客：
       - 若佇列為空，表示沒有房間 → 開新房間。
       - 否則檢查 `heap.top()`：
         - 如果 `heap.top().departure <= arrive`，房間可重複使用 → 指派該房間。
         - 否則 → 開新房間。
       - 將 `{-departure, 房號}` 推入堆中。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;

int main() {
    fastio;
    LL N;
    cin >> N;

    LL roomCnt = 0;
    priority_queue<pLL> s;
    vector<pair<pLL, LL>> time(N);
    vector<LL> roomName(N);

    for (int i = 0; i < N; ++i) {
        cin >> time[i].first.first >> time[i].first.second;
        time[i].second = i;
    }
    sort(time.begin(), time.end());

    for (int i = 0; i < N; ++i) {
        LL arrive = time[i].first.first, departure = time[i].first.second, index = time[i].second;
        if (s.empty()) {
            s.push({-departure, 1});
            roomName[index] = 1;
            roomCnt = max(roomCnt, LL(1));
            continue;
        }
        auto it = s.top();

        if (it.first <= -arrive) {  // 房間可重用
            s.push({-departure, it.second});
            s.pop();
            roomName[index] = it.second;
        } else {  // 開新房間
            s.push({-departure, ++roomCnt});
            roomName[index] = roomCnt;
        }
    }

    cout << roomCnt << '\n';
    for (auto e : roomName) {
        cout << e << ' ';
    }
}
```

## Factory Machines [problem](https://cses.fi/problemset/task/1620)
```markdown
題目: 

有 `N` 台機器，第 `i` 台機器生產一個產品需要 `arr[i]` 單位時間。  
目標是在最短的時間內生產至少 `K` 個產品，輸出這個最短時間。
```
``` markdown
解法 : 

1. 時間可行性檢查 (valid function)
若給定一個時間 `T`：
- 每台機器可生產的數量為 `⌊T / arr[i]⌋`
- 將所有機器的生產量加總，判斷是否 ≥ `K`

2. 二分搜尋 (Binary Search on Answer)
因為「時間 → 能否生產 K 個產品」是單調遞增的：
- 時間越長，越容易達到目標。
- 可用二分搜尋找最小的 `T`。

這裡採用「jump search」的寫法（等效於 binary search）：
1. 初始 `ans` 設為一個足夠大的值 (`2^60`)。
2. 由大到小依次減少「跳躍值」`jump`，嘗試縮小 `ans`。
3. 若 `valid(ans - jump)` 成立 → 更新 `ans -= jump`。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

vector<LL> arr;

bool valid(LL T, LL K, LL N) {
    LL sum = 0;
    for (int i = 0; i < N; ++i) {
        sum += T / arr[i];
        if (sum >= K) return true; // 提前結束
    }
    return false;
}

int main() {
    fastio;
    LL N, K;
    cin >> N >> K;
    arr.resize(N);

    for (int i = 0; i < N; ++i) cin >> arr[i];

    LL ans = LL(1) << 60; // 初始化大時間
    for (LL jump = LL(1) << 59; jump; jump >>= 1) {
        while (valid(ans - jump, K, N)) {
            ans -= jump;
        }
    }
    cout << ans;
}
```

## Tasks and Deadlines [problem](https://cses.fi/problemset/task/1630)
```markdown
題目: 

有 `N` 個工作，每個工作有：
- 時間 `arr[i]`
- 獎勵值 `r[i]`

工作時，你可以選擇任意順序來做。  
每當完成一本個工作，你會失去「累積工作時間」數量的獎勵值。  
請計算最終的「總獎勵」。
```
``` markdown
解法 : 

### 1. 觀察損失公式
假設工作的完成順序為 `a[1], a[2], ..., a[N]`：
- 做完第 1 個工作後，損失 `a[1]`
- 做完第 2 個工作後，損失 `a[1] + a[2]`
- ...
- 總損失 = Σ (做完第 k 個工作的累積時間)

因此，完成時間短的工作應該優先完成，以減少累積時間造成的獎勵損失。

### 2. 演算法
1. 讀入 `N` 個工作的 `(time, reward)`。
2. 將所有工作的時間 `time` 排序（獎勵值不影響順序）。
3. 先計算所有獎勵值總和 `reward`。
4. 從前到後累積時間 `Time`，並在每次完成時扣除該累積時間：
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
 fastio;
 LL N;
 cin >> N;
 LL reward = 0;
 vector<LL> arr(N);

 for (int i = 0; i < N; ++i) {
     LL r;
     cin >> arr[i] >> r;
     reward += r;  // 累積總獎勵
 }

 sort(arr.begin(), arr.end());

 LL Time = 0;
 for (int i = 0; i < N; ++i) {
     Time += arr[i];
     reward -= Time;
 }
 cout << reward;
}
```

## Reading Books [problem](https://cses.fi/problemset/task/1631)
```markdown
題目: 

有 `n` 本書，每本書的閱讀時間為 `a[i]`。  
有兩個人，可以同時閱讀兩本書，但同一本書不能被兩個人同時閱讀。  
請輸出兩個人都完成閱讀所有書所需的最短時間。
```
``` markdown
解法 : 

1. **觀察最短時間的下界**
   - 若所有書可依序閱讀 → 時間下界為 `sum`（所有書時間總和）。
   - 若有一本書過長 → 就算兩個人並行，其長度仍然限制了最短時間，必須至少是 `2 * max(a[i])`。

2. **最短時間**
   因此答案必須是： ans = max(sum, 2 * max(a[i]))
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
 fastio;
 int n;
 cin >> n;
 vector<long long> a(n);
 long long sum = 0, mx = 0;
 for (int i = 0; i < n; ++i) {
     cin >> a[i];
     sum += a[i];
     mx = max(mx, a[i]);
 }
 cout << max(sum, 2 * mx) << "\n";
}
```

## Sum of Three Values [problem](https://cses.fi/problemset/task/1641)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個目標值 `x`

請找出三個不同的索引 `i, j, k`，使得： `a[i] + a[j] + a[k] = x`
若有解，輸出這三個索引（任意順序）；若無解，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. 排序 + 雙指標
- 首先將所有數字與原本的索引一起存起來（為了最終輸出原始位置）。
- 依照數值大小排序陣列。
- 接著，枚舉第一個數字 `a[i]`，並在剩下的 `[i+1, n-1]` 之間利用雙指標 (`l`, `r`) 搜尋是否存在
  另外兩個數字湊成 `x`。

### 2. 具體流程
1. 對 `i` 從 `0` 到 `n-3`：
   - 設 `l = i+1`、`r = n-1`
   - 當 `l < r`：
     - 若 `a[i] + a[l] + a[r] == x` → 輸出三個索引並結束。
     - 若總和 < `x` → `l++`
     - 否則 → `r--`
2. 若全部搜尋後仍無解，輸出 `"IMPOSSIBLE"`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, int> pli;

int main() {
    fastio;
    int n;
    LL x;
    cin >> n >> x;

    vector<pli> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i].first;
        arr[i].second = i + 1; // 保留原始索引（1-based）
    }

    sort(arr.begin(), arr.end());

    for (int i = 0; i < n - 2; ++i) {
        int l = i + 1, r = n - 1;
        while (l < r) {
            LL sum = arr[i].first + arr[l].first + arr[r].first;
            if (sum == x) {
                cout << arr[i].second << ' ' << arr[l].second << ' ' << arr[r].second << '\n';
                return 0;
            } else if (sum < x) {
                ++l;
            } else {
                --r;
            }
        }
    }

    cout << "IMPOSSIBLE\n";
}
```

## Sum of Four Values [problem](https://cses.fi/problemset/task/1642)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個目標值 `x`

請找出三個不同的索引 `i, j, k, l`，使得： `a[i] + a[j] + a[k] + a[l] = x`
若有解，輸出這四個索引（任意順序）；若無解，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. 排序
- 先將所有數字與原本的索引存成 pair。
- 對陣列依數值大小排序，方便後續雙指標搜尋。

---

### 2. 外層枚舉 + 內層雙指標
- 外層先枚舉前兩個數字：
  - 第一層：`m` 從 `0` 到 `n-4`
  - 第二層：`i` 從 `m+1` 到 `n-3`
- 接著用雙指標 (`l`, `r`) 處理剩下的兩個數字：
  1. `l = i+1`
  2. `r = n-1`
  3. 計算 `sum = arr[m] + arr[i] + arr[l] + arr[r]`
     - 若 `sum == x` → 找到解答
     - 若 `sum < x` → `l++`
     - 若 `sum > x` → `r--`
  4. 若全部搜尋後仍無解，輸出 `"IMPOSSIBLE"`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, int> pli;

int main() {
    fastio;
    int n;
    LL x;
    cin >> n >> x;

    vector<pli> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i].first;
        arr[i].second = i + 1; // 保留原始索引（1-based）
    }

    sort(arr.begin(), arr.end());

    for (int m = 0; m < n - 3; ++m) {
        for (int i = m + 1; i < n - 2; ++i) {
            int l = i + 1, r = n - 1;
            while (l < r) {
                LL sum = arr[m].first + arr[i].first + arr[l].first + arr[r].first;
                if (sum == x) {
                    cout << arr[m].second << ' ' 
                         << arr[i].second << ' '
                         << arr[l].second << ' '
                         << arr[r].second << '\n';
                    return 0;
                } else if (sum < x) {
                    ++l;
                } else {
                    --r;
                }
            }
        }
    }

    cout << "IMPOSSIBLE\n";
}
```

## Nearest Smaller Values [problem](https://cses.fi/problemset/task/1645)
```markdown
題目: 

給定一個長度為 `N` 的陣列 `arr`，對於每個位置 `i`，請找出：
- 在 `i` 左邊且比 `arr[i]` 小的最近一個位置。
- 若不存在，輸出 `0`。
```
``` markdown
解法 : 

### 1. 單調遞增堆疊（Monotonic Stack）
- 我們使用一個 stack 來記錄「候選位置」。
- 從右到左遍歷陣列：
  1. 當前元素 `arr[i]` 與 stack 頂端比較：
     - 若 stack.top 的值大於 `arr[i]` → 這些值的最近較小值就是 `i`，因此更新答案並 pop。
     - 否則停止。
  2. 將當前元素 `(arr[i], i)` 推入 stack。

---

### 2. 為什麼要從右到左？
- 因為題目要的是「左邊最近較小值」。
- 從右向左掃描，當遇到某個元素時，可以幫助堆疊中「右邊」的元素找到它們最近的較小值。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;

const int SIZE = 2 * 1e5;
LL arr[SIZE + 50], ans[SIZE + 50];

int main() {
    fastio;
    LL N;
    cin >> N;
    arr[0] = -INT_MAX; // 虛擬邊界

    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }

    stack<pLL> s;
    for (int i = N; i >= 0; --i) {
        while (!s.empty()) {
            if (s.top().first > arr[i]) {
                ans[s.top().second] = i;
                s.pop();
            } else {
                break;
            }
        }
        s.push({arr[i], i});
    }

    for (int i = 1; i <= N; ++i) {
        cout << ans[i] << ' ';
    }
}
```

## Subarray Sums I [problem](https://cses.fi/problemset/task/1660)
```markdown
題目: 

給定：
- 一個長度為 `N` 的陣列 `arr`
- 一個目標和 `M`

請計算有多少個連續子陣列，其元素總和等於 `M`。
```
``` markdown
解法 : 

### 1. 兩指標（Sliding Window）
因為題目條件保證：
- 陣列中的數字為 **非負整數**。

這使得我們可以用兩指標（`l`, `r`）維護一個「滑動視窗」：
- 當 `curSum < M` → 擴展 `r`。
- 當 `curSum > M` → 收縮 `l`。
- 每次更新後檢查 `curSum == M`，若成立則計數。

這種方法避免了 `O(N^2)` 的暴力檢查，能在線性時間內完成。

---

### 2. 演算法流程
1. 初始化 `l = 0`，`curSum = 0`，`ans = 0`
2. 遍歷 `r` 從 `0` 到 `N-1`：
   - `curSum += arr[r]`
   - 若 `curSum == M` → 答案加 1
   - 若 `curSum > M` → 不斷移動 `l` 並減去 `arr[l]`，直到 `curSum <= M`
     - 若此時 `curSum == M` → 答案加 1
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N, M;
    cin >> N >> M;

    vector<LL> arr(N);
    for (int i = 0; i < N; ++i) {
        cin >> arr[i];
    }

    LL curSum = 0, ans = 0;
    for (int l = 0, r = 0; r < N; r++) {
        curSum += arr[r];

        if (curSum == M) {
            ans++;
        } else if (curSum > M) {
            while (curSum > M) {
                curSum -= arr[l++];
            }
            if (curSum == M) {
                ans++;
            }
        }
    }
    cout << ans;
}
```

## Subarray Sums II [problem](https://cses.fi/problemset/task/1661)
```markdown
題目: 

給定：
- 一個長度為 `N` 的陣列 `arr`
- 一個目標和 `M`

請計算有多少個連續子陣列，其元素總和等於 `M`。
```
``` markdown
解法 : 

### 1. 前綴和 (Prefix Sum)
我們可以利用前綴和的性質：
sum[i, j] = prefix[j] - prefix[i-1]
如果要讓子陣列 `[i, j]` 的總和為 `x`，就必須滿足：
prefix[j] - prefix[i-1] = x
⇒ prefix[i-1] = prefix[j] - x
因此，我們可以在遍歷陣列時，同步記錄「某個前綴和出現的次數」。

---

### 2. 演算法流程
1. 建立一個 `map<long long, int> cnt`，紀錄前綴和的出現次數。
   - 初始化 `cnt[0] = 1`，代表「空前綴」。
2. 遍歷陣列：
   - 累加 `sum`。
   - 查詢 `cnt[sum - x]`，將其加到答案中（表示存在若干個前綴和可形成目標區間）。
   - 將 `cnt[sum]++` 更新。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, x;
    cin >> n >> x;
    vector<int> a(n);
    for (int &v : a) cin >> v;

    map<long long, int> cnt;
    cnt[0] = 1; // 空前綴
    long long sum = 0, ans = 0;

    for (int i = 0; i < n; ++i) {
        sum += a[i];
        ans += cnt[sum - x]; // 找到可形成目標的前綴
        cnt[sum]++;
    }

    cout << ans << '\n';
}
```

## Subarray Divisibility [problem](https://cses.fi/problemset/task/1662)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`

請計算有多少個連續子陣列的總和能被 `n` 整除。
```
``` markdown
解法 : 

### 1. 前綴和取模
如果子陣列 `[i, j]` 的總和能被 `n` 整除，必須滿足：
(prefix[j] - prefix[i-1]) % n == 0

等價於：
prefix[j] % n == prefix[i-1] % n

因此，只要計算每個前綴和的「模 n 值」出現的次數，就能統計所有合法子陣列。

---

### 2. 處理負數取模
因為前綴和可能為負數，因此：
mod_sum = ((sum % n) + n) % n

確保 `mod_sum` 始終為 `0 ~ n-1` 的非負值。

---

### 3. 演算法流程
1. 建立 `map<int, long long> cnt`，紀錄每個 `mod_sum` 出現次數。
   - 初始化 `cnt[0] = 1`（空前綴）。
2. 遍歷陣列：
   - 更新 `sum += a[i]`
   - 計算 `mod_sum = ((sum % n) + n) % n`
   - 將 `cnt[mod_sum]` 加到答案 `ans`
   - 更新 `cnt[mod_sum]++`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    map<int, long long> cnt;
    cnt[0] = 1; // 空前綴
    long long ans = 0, sum = 0;

    for (int i = 0; i < n; ++i) {
        sum += a[i];
        int mod_sum = ((sum % n) + n) % n; // 確保非負
        ans += cnt[mod_sum];
        cnt[mod_sum]++;
    }

    cout << ans << '\n';
}
```

## Distinct Values Subarrays II [problem](https://cses.fi/problemset/task/2428)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個整數 `k`

請計算有多少個子陣列，其中最多包含 `k` 個不同的數字。
```
``` markdown
解法 : 

### 1. 兩指標 + 雜湊表
我們用滑動視窗（`l`, `r`）搭配 `unordered_map` 來統計目前視窗內的元素頻率：
- 每次向右擴展 `r`，將 `a[r]` 加入計數。
- 若視窗內的不同數字數量超過 `k`，則不斷縮小 `l`，並更新頻率。

---

### 2. 計算子陣列數量
對於每個 `r`：
- 當 `cnt.size() <= k` 時，所有以 `r` 結尾的子陣列都是合法的。
- 這些子陣列的數量 = `r - l + 1`

將其加到答案中。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    unordered_map<int, int> cnt;
    long long ans = 0;
    int l = 0;

    for (int r = 0; r < n; ++r) {
        cnt[a[r]]++;
        while (cnt.size() > k) {
            cnt[a[l]]--;
            if (cnt[a[l]] == 0) cnt.erase(a[l]);
            l++;
        }
        ans += (r - l + 1);
    }

    cout << ans << '\n';
}
```

## Array Division [problem](https://cses.fi/problemset/task/1085)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個整數 `k`

請將陣列切成 `k` 個或更少的連續子陣列，並使得「所有子陣列總和的最大值」最小化。  
輸出這個最小化後的最大子陣列和。
```
``` markdown
解法 : 

### 1. 二分搜尋答案
- 最小的可能答案是 `max(a)`（至少要能容納最大的單一元素）。
- 最大的可能答案是 `sum(a)`（把所有元素放在同一組）。
- 用二分搜尋檢查某個「最大子陣列和」是否可行。

---

### 2. 可行性檢查 (Greedy)
`check(x)`：
- 從左到右遍歷陣列，累積子陣列和。
- 如果加上當前元素會超過 `x` → 切分為新的子陣列。
- 計算分割次數 `cnt`。
- 若 `cnt <= k` → 代表可行。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    long long l = *max_element(a.begin(), a.end());
    long long r = accumulate(a.begin(), a.end(), 0LL);
    long long ans = r;

    auto check = [&](long long x) {
        int cnt = 1;
        long long sum = 0;
        for (int i = 0; i < n; ++i) {
            if (sum + a[i] > x) {
                cnt++;
                sum = a[i];
            } else {
                sum += a[i];
            }
        }
        return cnt <= k;
    };

    while (l <= r) {
        long long mid = (l + r) / 2;
        if (check(mid)) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    cout << ans << "\n";
}
```

## Movie Festival II [problem](https://cses.fi/problemset/task/1632)
```markdown
題目: 

給定：
- `n` 部電影，每部電影有開始時間 `a` 和結束時間 `b`
- `k` 個觀眾，每個觀眾不能同時看兩部重疊的電影

請計算最多可以觀看多少部電影（總計，不限觀眾順序）。
```
``` markdown
解法 : 

### 1. 貪心 + 多觀眾模擬
這題是 **Movie Festival I** 的延伸：
- 在單觀眾的情況下，我們用「按結束時間排序」+ 貪心法。
- 多觀眾的情況下，則需要追蹤每位觀眾「當前已看電影的結束時間」。

我們用一個 `multiset<int> ends` 來維護所有觀眾當前可接續的最晚結束時間。

---

### 2. 演算法流程
1. 將所有電影依照結束時間 `b` 排序（若相同，開始時間 `a` 不影響）。
2. 遍歷所有電影 `(a,b)`：
   - 在 `ends` 中找到 **第一個結束時間 > a** 的觀眾。
     - 若沒有符合的 → 檢查是否還能新增新的觀眾（`ends.size() < k`）。
   - 若找到 → 將該觀眾的結束時間更新為 `b`。
3. 每次成功分配一部電影給某個觀眾，`ans++`。

---

### 3. 為什麼要用 `upperbound`
- `upper_bound(a)` 找到第一個 **大於 `a`** 的結束時間。
- 若 `it != begin()` → `--it` 即為「小於等於 `a` 的最大結束時間」（能接這部電影）。
- 若 `it == begin()` → 沒有任何觀眾能接這部電影，檢查是否可新增觀眾。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int n, k;
vector<pair<int,int>> movies;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> k;
    for (int i = 0; i < n; ++i) {
        int a, b;
        cin >> a >> b;
        movies.emplace_back(b, a); // 按右端點排序
    }
    sort(movies.begin(), movies.end());

    multiset<int> ends; // 每位觀眾最後結束時間
    int ans = 0;

    for (auto [b, a] : movies) {
        auto it = ends.upper_bound(a); // 找 > a 的第一個
        if (it == ends.begin()) {
            if ((int)ends.size() < k) {
                ends.insert(b);
                ans++;
            }
        } else {
            --it; // 找到 <= a 的最大值
            ends.erase(it);
            ends.insert(b);
            ans++;
        }
    }

    cout << ans << "\n";
}
```

## Maximum Subarray Sum II [problem](https://cses.fi/problemset/task/1644)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `x`
- 兩個整數 `a` 和 `b`，代表子陣列長度範圍 `[a, b]`

請找出長度在 `[a, b]` 之間的子陣列總和的最大值。
```
``` markdown
解法 : 

### 1. 前綴和
定義：
prefix[i] = x[1] + x[2] + ... + x[i]

若子陣列為 `[l, r]`：
sum(l, r) = prefix[r] - prefix[l-1]

若子陣列長度限制為 `[a, b]`：
l ∈ [r-b, r-a]
因此：sum(l, r) = prefix[r] - min(prefix[l-1]) for l-1 ∈ [r-b, r-a]
換句話說，對於每個 `r`，要找到 `prefix[j]` 的最小值（其中 `j` 在 `[r-b, r-a]`）。

---

### 2. 單調遞增雙端佇列 (Monotonic Deque)
用 `deque` 維護一個遞增的前綴和索引：
- 在 `r` 遞增時，先將 `prefix[r-a]` 加入窗口（可能成為候選最小值）。
- 移除所有超出 `r-b` 的舊索引。
- `deque.front()` 始終是當前窗口內的最小前綴和。
- 更新答案：`ans = max(ans, prefix[r] - prefix[dq.front()])`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, a, b;
ll x[200005], prefix[200005];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> a >> b;
    for (int i = 1; i <= n; ++i) {
        cin >> x[i];
        prefix[i] = prefix[i-1] + x[i];
    }

    ll ans = LLONG_MIN;
    deque<int> dq;

    for (int r = a; r <= n; ++r) {
        // 把 prefix[r-a] 加進窗口
        while (!dq.empty() && prefix[dq.back()] >= prefix[r-a])
            dq.pop_back();
        dq.push_back(r-a);

        // 移除窗口外的元素
        while (!dq.empty() && dq.front() < r-b)
            dq.pop_front();

        ans = max(ans, prefix[r] - prefix[dq.front()]);
    }

    cout << ans << "\n";
}
```
## Distinct Numbers [problem](https://cses.fi/problemset/task/1621)
```
題目: 計算序列中有幾個不同的元素
```
```
解法1 : 可使用 std::set 的特性，也就是 set 中只會保留唯一的元素，可以自動去重

解法2 : 可使用 std::unorder_map，也就是用 hashing 來統計共出現了幾個不同的元素
```

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

## Apartments [problem](https://cses.fi/problemset/task/1084)
```
題目: 

給你：

N 個申請人，每個人希望能租到接近其需求大小的公寓。

M 間公寓，每間公寓有實際的大小。

允許的誤差範圍 K。

要求：

一個人只能租一間公寓。

公寓的大小必須落在 [需求-K, 需求+K] 之間。

輸出：最多能成功配對多少組。
```
```
解法: 
1. 先將申請人需求的陣列排序。

將所有 公寓大小 存進 multiset，方便用 lower_bound 查詢。

2. 依序遍歷每個申請人，對每個需求：

計算能接受的最小公寓大小 low = arr[i] - K。

使用 multiset.lower_bound(low) 找到第一個 不小於 low 的公寓。

檢查該公寓是否 ≤ arr[i] + K，若是則分配，並從 multiset 中刪掉該公寓。

否則該申請人無法配對。

這樣能確保每個申請人都拿到「最小可行的公寓」，避免浪費大公寓。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N, M, K;
    cin >> N >> M >> K;
    
    vector<LL> arr(N);
    multiset<LL> ms;
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } sort(arr.begin(), arr.end());
 
    for(int i = 0; i < M; ++i){
        LL num; cin >> num;
        ms.insert(num);
    }
 
    LL ans = 0;
    for(int i = 0; i < N; ++i){
        LL low = arr[i] - K, high = arr[i] + K;
        auto it = ms.lower_bound(low);
        if(it != ms.end()){
            if(*it <= high){
                ans++;
                ms.erase(it);
            }
        } 
    } cout << ans;
}
```

## Ferris Wheel [problem](https://cses.fi/problemset/task/1090)
```
題目: 

給你：

N 個要搭 gondola 的小孩的體重。

要求：

不能超過一艘 gondola 的載重 X

一艘 gondola 可以載一個或兩個小孩

輸出：最少能幾趟載完所有人。
```
```
解法: 
1. 將所有數字存進 multiset（取負號）
透過 -num，讓 multiset 內部可以 由大到小排序（因為 multiset 預設是遞增順序）。

2. 每次取最大元素作為主元素
從 multiset 中取出目前最大的數字（因為取的是 -num，其實是最小的負數）。

3. 嘗試搭配次元素

假設目前取出的數字是 x，要找一個 y 使得 x + y ≤ M。

這裡的 lower_bound(-(M + begin)) 其實就是在找 能與 x 搭配且不超過限制的最大 y。

成功配對 → 移除兩個元素

如果找到合適的 y，將其從 multiset 中移除。

不管是否成功配對，都算一次操作（因為即使 x 找不到 y，也會被單獨消耗掉）。

重複直到 multiset 空

每次處理完一個最大元素，繼續處理下一個。

最後 ans 計算總共完成了多少組。

小技巧:
可以用負值來讓這些預設為升序排列的 STL 變成降序排列的
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    multiset<LL> ms;
    for(int i = 0; i < N; ++i){
        LL tmp; cin >> tmp;
        ms.insert(-tmp);
    }
 
    LL ans = 0;
    for(int i = 0; i < N && !ms.empty(); ++i){
        LL begin = *(ms.begin());
        ms.erase(ms.begin());
        auto it = ms.lower_bound(-(M + begin));
 
        if(it != ms.end()){
            ms.erase(it);
        }
        ans ++;
    }
    cout << ans;
}
```

## Concert Tickets [problem](https://cses.fi/problemset/task/1091)
```
題目: 

給你：

N 張 concert 的票的價格。

Q 個 query: 

每個顧客會有個心目中的價格上限 K

你要找出最接近但不超過 K 的票給那個顧客

若有票輸出那張票的價格，若沒有，輸出 -1
```
```
解法: 

1. 用 multiset 儲存所有數字（取負號）

將每個輸入的數字 tmp 存成 -tmp。

這樣 multiset 內部會依照「由大到小」的邏輯排序（因為 multiset 預設是遞增）。

2. 處理每個查詢 query

我們要找到「不大於 query 的最大數字」。

因為數字是以負號存放，所以要找 lower_bound(-query)：

-query 會找到「第一個大於等於 -query」的負數。

這其實對應到「不大於 query 的最大正數」。

3. 輸出與刪除

如果找到符合的數字：

印出 -(*it)（轉回正數）。

把它從 multiset 移除，避免重複使用。

如果找不到（it == ms.end()）：

印出 -1。

小技巧:
可以用負值來讓這些預設為升序排列的 STL 變成降序排列的
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    multiset<LL> ms;
 
    for(int i = 0; i < N; ++i){
        LL tmp; cin>>tmp;
        ms.insert(-tmp);
    }
 
    while(M--){
        LL query;
        cin >> query;
        if(ms.empty()){
            cout << -1 << '\n';
            continue;
        }
 
        auto it = ms.lower_bound(-query);
        if(it == ms.end()){
            cout << -1 << '\n';
        } else{
            cout << -(*it) << '\n';
            ms.erase(it);
        }
    }
}
```

## Restaurant Customers  [problem](https://cses.fi/problemset/task/1619)
```
題目: 

給你：

N 個顧客的用餐的時間。

輸出最多同時在餐廳的人數
```
```
解法: 

1. 用 map<LL, LL> 做時間事件紀錄，因為這題的數字很大，不能用常規差分來做

table[start]++：在 start 時刻，人數 +1。

table[end]--：在 end 時刻，人數 -1。

這個 map 會自動按照 key（時間點）排序。

2. 線性掃描所有時間點

宣告 hooman = 0（目前人數）。

依序遍歷 table：

將 hooman 加上這個時間點的變化量（可能是 +1 或 -1）。

不斷更新 ans = max(ans, hooman) 來記錄目前遇到的最大人數。

3. 輸出結果

最後 ans 就是同時存在的最大人數。
```

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
 
LL Pow(int x, int power){
    if(power == 0){
        return 1;
    } else if(power == 1){
        return x;
    }
    LL val = Pow(x, power>>1) % MOD;
    if(power & 1){
        return ((x * val % MOD) * val) % MOD;
    } else {
        return (val * val) % MOD;
    }
}
 
int main(){
    fastio;
    LL N;
    cin >> N;
    LL ans = 0, hooman = 0;
    map<LL, LL> table;
    for(int i = 0; i < N; ++i){
        LL start, end;
        cin >> start >> end;
        table[start] ++;
        table[end] --;
    }
 
    for(auto e : table){
        hooman += e.s;
        ans = max(ans, hooman);
    } cout << ans << '\n';
}
```

## Movie Festival  [problem](https://cses.fi/problemset/task/1629)
```
題目: 

在一個電影節，總共有 n 部電影

每部電影有自己的放映區間 (a, b)

你要輸出在時間不重疊的情況下可以看到幾部電影
```
```
解法: 

1. 讀取所有區間：先把每個區間記錄成 (L, R)。

2. 排序：

先依照 L（起點）遞增排序；

若 L 相同，再依照 R（終點）遞減排序。
這樣可以確保相同起點時，先處理「範圍大的區間」，避免先被短的截斷。

3. 遍歷區間：

用 maxR 記錄「目前已經選的區間」的右端點。

每遇到一個新區間：

如果它不和前面選的重疊（L >= maxR）：選它，cnt++ 並更新 maxR。

如果它和前面重疊（L < maxR）：
→ 把 maxR 改成「更短的結尾」，也就是 R 比 maxR 小的那個，這樣能保留更多空間給後面可能的區間。

更新答案：ans = max(ans, cnt) 追蹤目前最多能選的數量。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
bool cmp(pLL a, pLL b){
    return (a.f == b.f) ? a.s > b.s : a.f < b.f;
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
    
    vector<pLL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i].f >> arr[i].s;
    }
 
    sort(arr.begin(), arr.end());
    
    LL maxR = -1, cnt = 0, ans = 0;
    for(int i = 0; i < N; ++i){
        if(maxR <= arr[i].f){
            maxR = arr[i].s;
            cnt++;
        } else {
            if(arr[i].s < maxR){
                maxR = arr[i].s;
            }
        } ans = max(cnt, ans);
    } cout << ans;
}
```

## Sum of Two Values [problem](https://cses.fi/problemset/task/1640)
```
題目: 

你有一個長度為 N 的陣列 arr。

你需要找出兩個不同的元素 arr[i] 和 arr[j]，使得：

arr[i]+arr[j]=M

並輸出這兩個元素的索引（1-based）。

如果沒有這樣的組合，輸出 "IMPOSSIBLE"。
```
```
解法: 

1. 頻率表：先把所有數字記錄下來，知道每個數字出現幾次。

2. 枚舉每個元素：依序看每個數字 x，計算它需要的搭檔 M - x。

3. 檢查是否能配對：

如果搭檔的數字存在，而且：

它跟 x 是不同的數字，或

它跟 x 相同但數量至少 2
→ 那就能配對成功。

找出對應的另一個數字：一旦確定有配對，就去找到這個搭檔，並直接輸出兩個數字的位置。

沒有配對則輸出 "IMPOSSIBLE"：如果所有數字都檢查完了，還是找不到符合的組合，就輸出不可能。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE 2*int(1e5)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<int, int> pii;
LL arr[SIZE];
 
int main(){
    fastio;
    LL N, M;
    cin >> N >> M;
    map<int, int> m;
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
        m[arr[i]]++;
    }
 
    for(int i = 0; i < N; ++i){
        LL diff = M - arr[i], cnt = m[diff];
        if(cnt > 1 || (cnt == 1 && diff != arr[i])){
            cout << i + 1 << ' ';
            for(int j = 0; j < N; ++j){
                if(arr[j] == diff && j!=i){
                    cout << j + 1 << '\n';
                    return 0;
                }
            }
        }
    }
 
    cout << "IMPOSSIBLE";
}
```

## Maximum Subarray Sum [problem](https://cses.fi/problemset/task/1643)
```
題目: 

給定一個長度為 n 的整數序列，請找出其中的最大子陣列和（連續子陣列的總和最大值）。
```
```
解法: 

1. 使用 Kadane’s Algorithm：
   - 維護一個目前的區段總和 localSum，以及全域最大總和 maxSum。
   
2. 遍歷序列：
   - 若 localSum + 當前數字 > 0：累加到 localSum，並更新 maxSum。
   - 否則：重置 localSum = 0，並用當前數字更新 maxSum（處理全負數情況）。

3. 最終輸出 maxSum：
   - 即為最大子陣列和。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define SIZE 2*int(1e5)
#define INF INT_MAX
typedef long long LL;
 
LL arr[SIZE];
 
int main(){
    fastio;
    LL N;
    cin >> N;
    LL localSum = 0, maxSum = -INF;
    while(N--){
        LL num; cin >> num;
        if(localSum + num > 0){
            localSum += num;
            maxSum = max(maxSum, localSum);
        } else {
            localSum = 0;
            maxSum = max(maxSum, num);
        }
    }
    cout << maxSum << '\n';
}
```

## Stick Lengths [problem](https://cses.fi/problemset/task/1074)
```
題目: 

給定 n 個整數，請找出一個高度 H，使得所有元素調整到 H 的總成本（|arr[i] - H| 的總和）最小。
並輸出這個最小成本。
```
```
解法: 

1. 排序：
   - 先將陣列 arr 排序，因為 |arr[i] - H| 的總和在排序後有「中位數最小化絕對差」的性質。

2. 中位數性質：
   - 當成本定義為絕對值差距時，最小成本一定在中位數（或偶數長度時的兩個中位數之一）。
   - 因此，直接取：
     - 若 N 為奇數：選中位數。
     - 若 N 為偶數：檢查兩個中位數，計算各自的成本，取較小者。

3. 計算成本：
   - 對選定的 H，計算 Σ |arr[i] - H|。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N);
    for(int i = 0; i < N; ++i) cin >> arr[i];
    sort(arr.begin(), arr.end());

    auto cost = [&](LL h) {
        LL res = 0;
        for (LL v : arr) res += abs(v - h);
        return res;
    };

    LL ans;
    if (N % 2 == 1) {
        ans = cost(arr[N / 2]);
    } else {
        ans = min(cost(arr[N / 2]), cost(arr[N / 2 - 1]));
    }

    cout << ans << '\n';
}
```

## Missing Coin Sum [problem](https://cses.fi/problemset/task/2183)
```
題目: 

給定 n 個整數，請找出一個高度 H，使得所有元素調整到 H 的總成本（|arr[i] - H| 的總和）最小。
並輸出這個最小成本。
```
```
解法: 

1. 排序：
   - 先將所有硬幣按照面值遞增排序。
   - 這樣可以保證我們能夠從小到大逐步確認哪些金額可以被湊出。

2. 貪心思路：
   - 設一個變數 res，表示目前能夠湊出的「連續金額區間」的上界（初始為 1）。
   - 對於每個硬幣 coins[i]：
     - 若 coins[i] ≤ res，代表這個硬幣能幫助我們把可湊範圍往後擴展，更新 res += coins[i]。
     - 若 coins[i] > res，代表出現了斷層，我們無法湊出 res 這個金額，因此答案就是 res。

3. 輸出答案：
   - 當遍歷完所有硬幣，res 就是最小不能被湊出的金額。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
int main() {
    int n;
    cin >> n;
    vector<long long> coins(n);
    for (auto& x : coins) cin >> x;
    sort(coins.begin(), coins.end());
 
    long long res = 1;
    for (int i = 0; i < n; i++) {
        if (coins[i] > res) break;
        res += coins[i];
    }
    cout << res << endl;
}
```

## Collecting Numbers [problem](https://cses.fi/problemset/task/2183)
```
題目: 

給定 1 到 N 的一個排列，你需要計算「最少需要幾輪」才能把數字按照遞增順序分組完成。  
一輪的概念：如果數字 i 出現在 i-1 的後面，就可以跟前一輪延續；  
否則需要開啟新的一輪。
```
```
解法: 

1. 讀取輸入：
   - 讀取 N，並建立一個長度 N+1 的陣列 arr。
   - arr[x] 代表數字 x 在原序列中的位置。

2. 建立位置對應：
   - 我們讀入數字的同時，記錄它在原排列中的位置。
   - 例如：若輸入排列為 [4, 2, 1, 3]
     → arr[4] = 1, arr[2] = 2, arr[1] = 3, arr[3] = 4。

3. 計算「回合數」：
   - 初始化 round = 1。
   - 從 2 走到 N：
     - 如果 arr[i] < arr[i-1]，代表數字 i 出現在 i-1 的前面，序列被「斷開」→ 需要新的一輪。
     - 否則，沿用同一輪。

4. 輸出答案：
   - 最後的 round 即為答案。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        LL num; cin >> num;
        arr[num] = i;
    }

    LL round = 1;
    for (int i = 2; i <= N; ++i) {
        if (arr[i] < arr[i-1])
            round++;
    }
    cout << round;
}
```

## Collecting Numbers II [problem](https://cses.fi/problemset/task/2217)
```
題目: 

給定一個 1 到 N 的排列，以及 M 次 swap 操作。  
每次操作交換兩個位置的數字，並在每次交換後輸出「最少需要幾輪」才能將數字 1~N 依序分組完成。  

一輪的概念：如果數字 i 出現在 i-1 的後面，就可以跟前一輪延續；  
否則需要開啟新的一輪。
```
```
解法: 

1. 建立兩個映射：
   - `indexValue[i]`: 位置 i 的數字
   - `valueIndex[v]`: 數字 v 在排列中的位置  
   這樣能快速查詢「某數字在哪裡」和「某位置是什麼數字」。

2. 計算初始 round：
   - 遍歷 2 到 N，若 valueIndex[i] < valueIndex[i-1] → 代表序列斷開 → round++。

3. 觀察 swap 的影響：
   - 一次 swap 只會影響到少數幾個「鄰近關係」：
     - 被 swap 的兩個值 (valueA, valueB)
     - 以及它們各自的前一個值 (valueA-1, valueB-1)  
     因為只有這些數字的相對順序可能改變「斷點」。

4. 更新 round：
   - 在 swap 前，計算這些受影響的數字對是否形成斷點。
   - swap 後，更新 indexValue 與 valueIndex。
   - 再重新計算這些數字對的斷點數量。
   - round += (after - before)。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<int> indexValue(n + 1);     // index -> value
    vector<int> valueIndex(n + 1);     // value -> index

    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        indexValue[i] = x;
        valueIndex[x] = i;
    }

    int round = 1;
    for (int i = 2; i <= n; ++i) {
        if (valueIndex[i] < valueIndex[i - 1]) round++;
    }

    while (m--) {
        int a, b;
        cin >> a >> b;
        a--, b--;

        int valueA = indexValue[a];
        int valueB = indexValue[b];

        set<int> affected = {valueA - 1, valueA, valueB - 1, valueB};

        auto is_break = [&](int x) -> bool {
            if (x < 1 || x >= n) return false;
            return valueIndex[x] > valueIndex[x + 1];
        };

        int before = 0, after = 0;
        for (int x : affected) before += is_break(x);

        // swap values and update position mapping
        swap(indexValue[a], indexValue[b]);
        swap(valueIndex[valueA], valueIndex[valueB]);

        for (int x : affected) after += is_break(x);

        round += (after - before);
        cout << round << '\n';
    }
}
```

## Playlist [problem](https://cses.fi/problemset/task/1141)
```
題目: 

給定一個長度為 N 的陣列，請找出最長的不重複子陣列（Longest Unique Subarray）的長度。
```
```
解法: 

1. 使用 map 紀錄每個數字最後一次出現的位置：
   - `m[val]` 代表數字 val 上次出現的 index。

2. 維護 sliding window：
   - `tail`: 目前子陣列的左邊界。
   - `curLen`: 目前子陣列的長度。
   - `maxLen`: 最長不重複子陣列的長度。

3. 迭代陣列：
   - 若 arr[i] 曾出現過且 m[arr[i]] >= tail → 出現重複，更新 tail = m[arr[i]] + 1，並重新計
   算 curLen。
   - 否則，將 curLen 加 1。
   - 更新 m[arr[i]] = i，最後更新 maxLen。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;

    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }

    LL curLen = 0, maxLen = 0, tail = 0;
    map<LL, LL> m;

    for (int i = 1; i <= N; ++i) {
        if (m[arr[i]] && m[arr[i]] >= tail) {
            // 發現重複，移動 tail
            curLen = i - m[arr[i]];
            tail = m[arr[i]] + 1;
        } else {
            curLen++;
        }
        m[arr[i]] = i;
        maxLen = max(maxLen, curLen);
    }
    cout << maxLen;
}
```

## Towers [problem](https://cses.fi/problemset/task/1073)
```
題目: 

給定 N 個方塊，每個方塊有大小，必須依序處理。
你可以將一個方塊放到某個塔頂（前提是塔頂的方塊比它大），或者開一個新塔。
請問最少需要幾座塔？
```
```
解法: 

1. **轉換成最長非遞減子序列 (LNDS) 問題**  
   - 每一個塔的頂端就是一個「序列的開頭」。  
   - 由於每個塔內的方塊必須嚴格遞減，反過來看就等於要找最長的非遞減序列數量。  
   - 最少的塔數即等於 LNDS 的長度。

2. **LIS (Longest Increasing Subsequence) 實作**  
   - 使用一個 dp 陣列維護塔的頂端（實際上是非遞減序列的最後元素）。  
   - 對於每個方塊 x：
     - 使用 upper_bound(dp, x) 尋找第一個大於 x 的位置：
       - 如果找到 → 取代該位置的元素。
       - 否則 → 將 x 加入 dp 末尾。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
 
    vector<LL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } 
 
    LL ans = LIS(arr);
    cout << ans;
}
```

## Traffic Lights [problem](https://cses.fi/problemset/task/1163)
```
題目: 

有一條長度為 N 的線段，初始時沒有切割點。  
接著有 Q 次操作，每次會在某個位置切割這條線段，並輸出當前所有線段中最長線段的長度。
```
```
解法: 

1. 資料結構設計
   - points（multiset）：用來儲存所有切割點（包含 0 和 N）。
   - segment（multiset）：用來儲存目前所有線段的長度。

2. 流程
   1. 初始時：
      - 在 points 中插入 0 和 N。
      - 在 segment 中插入 N（整條線段）。
   2. 每次切割時：
      - 找到切割點 pos 左右的分割點 lPoint 和 rPoint：
        - lPoint = prev(points.lower_bound(pos))
        - rPoint = *(points.lower_bound(pos))
      - 從 segment 中移除原本的區段長度 (rPoint - lPoint)入新的兩段長度：
        - pos - lPoint
        - Point - pos
      - 將 pos 插入到 points。
      - 取 segment 中的最大值輸出。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;
 
#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define INF INT_MAX
#define MOD LL((1e9) + 7)
#define f first
#define s second
typedef long long LL;
typedef pair<LL, LL> pLL;
typedef pair<LL, int> pli;
 
bool cmp(pair<pLL, LL> a, pair<pLL, LL> b){
    if(a.f.f == b.f.f){
        return a.f.s > b.f.s;
    } return a.f.f < b.f.f;
}
 
int LIS(vector<LL>& a) {
    vector<LL> dp;
    for (LL x : a) {
        auto it = upper_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}
 
int main() {
    fastio;
    LL N;
    cin >> N;
 
    vector<LL> arr(N);
    for(int i = 0; i < N; ++i){
        cin >> arr[i];
    } 
 
    LL ans = LIS(arr);
    cout << ans;
}
```

## Distinct Values Subarrays [problem](https://cses.fi/problemset/task/3420)
```markdown
題目: 

給定一個長度為 `N` 的陣列，請計算 **所有子陣列中「不含重複元素」的子陣列總數**。
```
``` markdown
解法: 

1. **使用雙指針（Sliding Window）**
   - `l`：子陣列左邊界。
   - `r`：子陣列右邊界（從 1 走到 N）。

2. **使用 map 紀錄元素最後出現的位置**
   - `m[val]`：元素 `val` 最後一次出現的索引。

3. **演算法流程**
   - 依序遍歷陣列 `r = 1 → N`：
     1. 如果 `arr[r]` 曾出現過且 `m[arr[r]] >= l`，代表有重複元素。
        - 將 `l` 移動到 `m[arr[r]] + 1`，確保當前子陣列不重複。
     2. 更新 `m[arr[r]] = r`。
     3. 將目前不重複子陣列的數量加入 `ans`：
        - 每次新增的子陣列數量 = `r - l + 1`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N;
    cin >> N;
    
    vector<LL> arr(N + 1);
    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }
    
    LL ans = 0;
    map<LL, LL> m;
    
    for (int r = 1, l = 1; r <= N; ++r) {
        if (m[arr[r]] >= l) {
            l = m[arr[r]] + 1; // 移動左邊界
        }
        m[arr[r]] = r;         // 更新元素最後出現位置
        ans += r - l + 1;      // 新增的子陣列數量
    }
    
    cout << ans;
}
```

## Distinct Values Subsequences [problem](https://cses.fi/problemset/task/3421)
```markdown
題目: 

給定一個長度為 `N` 的陣列，請計算所有「非空子集」的數量，其中陣列中的重複元素視為可區分的，但最終
結果對 `10^9+7` 取模。
```
``` markdown
解法: 

1. **統計每個數字的出現次數**
   - 使用 `unordered_map<int, int> freq` 來紀錄每個元素的出現次數。

2. **子集計算公式**
   - 對於出現次數為 `k` 的元素，它可以被選擇 `0 ~ k` 次。
   - 對應的組合數量為 `k + 1`（包含不選）。
   - 對所有元素的結果相乘

3. **排除空集**
   - 上述計算包含「全部不選」的情況，需要減去 1。

4. **模運算**
   - 由於數字可能非常大，對每一步運算取 `MOD = 1e9 + 7`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;

// FastIO
void fastio() {
    ios::sync_with_stdio(false);
    cin.tie(0);
}

int main() {
    fastio();
    int n;
    cin >> n;
    vector<int> a(n);
    unordered_map<int, int> freq;

    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        freq[a[i]]++;
    }

    long long ans = 1;
    for (auto &p : freq) {
        ans = ans * (p.second + 1) % MOD; // 每個元素有 (count+1) 種選擇
    }

    ans = (ans - 1 + MOD) % MOD; // 減去空集

    cout << ans << '\n';
    return 0;
}
```

## Josephus Problem I [problem](https://cses.fi/problemset/task/2162)
```markdown
題目: 

給定一個整數 `n`，請模擬 **約瑟夫問題 (Josephus Problem)**，即每次移除隊列中的第 `k` 個人
（本例中 `k = 1`），並輸出所有被移除的順序。
```
``` markdown
解法1 : 

原始程式使用了 `__gnu_pbds::tree` 作為 `ordered_set` 來支援以下操作：
- `find_by_order(k)`: 取得集合中第 `k` 個元素 (0-based)。
- `erase(it)`: 移除該元素。

解法2 :
PBDS 雖然方便，但可能不支援部分編譯環境。我們可以用 **BIT** 來手動模擬順序刪除。

1. 建立一個長度為 `n` 的 BIT，初始每個位置為 `1`，表示該人仍存在。
2. 每次刪除第 `k` 個人：
   - 用 `find_kth(k)` 在 BIT 中找到第 `k` 個存活者的位置。
   - 將該位置更新為 `0`，表示刪除。
3. 每次刪除後，更新當前指標位置，繼續進行直到所有人被刪光。
```

``` cpp
解法1
#include <iostream> 
using namespace std; 
#include <ext/pb_ds/assoc_container.hpp> 
using namespace __gnu_pbds; 

#define ordered_set tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> 

int main() {
    int n, k = 1;
    cin >> n;
    ordered_set os;
    for (int i = 1; i <= n; i++) {
        os.insert(i);
    }

    int cur = 0;
    for (int i = 1; i <= n; i++) {
        cur = (cur + k) % os.size();
        auto it = os.find_by_order(cur);
        cout << *it << " ";
        os.erase(it);
    }
    return 0;
}
```
``` cpp
解法2
#include <bits/stdc++.h>
using namespace std;

struct BIT {
    int n;
    vector<int> bit;
    BIT(int n): n(n), bit(n + 1, 0) {}
    
    void update(int i, int delta) {
        for (; i <= n; i += i & -i) bit[i] += delta;
    }
    
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & -i) sum += bit[i];
        return sum;
    }
    
    int find_kth(int k) { // 找到第 k 個存活者的位置
        int pos = 0;
        int mask = 1 << (31 - __builtin_clz(n));
        for (; mask > 0; mask >>= 1) {
            int nxt = pos + mask;
            if (nxt <= n && bit[nxt] < k) {
                k -= bit[nxt];
                pos = nxt;
            }
        }
        return pos + 1;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k = 1;
    cin >> n;

    BIT bit(n);
    for (int i = 1; i <= n; ++i) bit.update(i, 1);

    int cur = 0;
    for (int i = 1; i <= n; ++i) {
        int remaining = n - i + 1;
        cur = (cur + k) % remaining;
        if (cur == 0) cur = remaining;
        int pos = bit.find_kth(cur);
        cout << pos << " ";
        bit.update(pos, -1);
        cur--; // 下一輪從刪掉的後一位開始
    }
}
```

## Josephus Problem II [problem](https://cses.fi/problemset/task/2163)
```markdown
題目: 

給定一個整數 `n`，請模擬 **約瑟夫問題 (Josephus Problem)**，即每次移除隊列中的第 `k` 個人
（本例中 `k = 任意數`），並輸出所有被移除的順序。
```
``` markdown
解法 : 

1. **BIT (Fenwick Tree) 模擬順序統計樹**：
   - `insert(x)`：將編號 `x` 標記為存活。
   - `erase(x)`：移除編號 `x`。
   - `find_by_order(k)`：找到目前第 `k` 個存活的人。
   - `size()`：回傳目前存活的人數。

2. **Josephus 主邏輯**：
   - 使用變數 `curr` 記錄當前的相對位置。
   - 每一輪：
     ```cpp
     k = (curr + K - 1) % rem + 1
     ```
     - `curr`：前一輪的位置。
     - `K`：每次要往前數的人數。
     - `rem`：目前剩下的人數。
     - `% rem` 處理環狀結構。
   - 用 `find_by_order(k)` 找到第 `k` 個存活的人，輸出並刪除。
   - 更新 `curr = k`，準備下一輪。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

class OST {
    vector<int> BIT;
    int MAX_VAL;

    void update(int i, int add) {
        while (i > 0 && i < (int)BIT.size()) {
            BIT[i] += add;
            i += i & -i;
        }
    }

    int sum(int i) {
        int ans = 0;
        while (i > 0) {
            ans += BIT[i];
            i -= i & -i;
        }
        return ans;
    }

public:
    OST(int val) {
        MAX_VAL = val;
        BIT.assign(MAX_VAL, 0);
    }

    void insert(int x) {
        if (x <= 0 || x >= (int)BIT.size()) return;
        update(x, 1);
    }

    void erase(int x) {
        if (!find(x)) return;
        update(x, -1);
    }

    bool find(int x) {
        if (x <= 0 || x >= (int)BIT.size()) return false;
        return sum(x) - sum(x - 1) > 0;
    }

    int order_of_key(int x) {
        if (x <= 0) return 0;
        if (x >= (int)BIT.size()) return sum(BIT.size() - 1);
        return sum(x);
    }

    int find_by_order(int k) { // 找第 k 個存活的人
        int l = 0, h = BIT.size();
        while (l < h) {
            int mid = (l + h) / 2;
            if (k <= sum(mid))
                h = mid;
            else
                l = mid + 1;
        }
        return l;
    }

    int size() {
        return sum(BIT.size() - 1);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, K;
    cin >> n >> K;

    OST s(n + 1);
    for (int i = 1; i <= n; i++) s.insert(i);

    int curr = 1;
    for (int i = 0; i < n; i++) {
        int rem = n - i;
        int k = (curr + K - 1) % rem + 1;
        int val = s.find_by_order(k);
        s.erase(val);
        cout << val << " ";
        curr = k;
    }
}
```

## Nested Ranges Check [problem](https://cses.fi/problemset/task/2168)
```markdown
題目: 

給定 `n` 個區間，每個區間有左右端點 `(l, r)`，需要判斷：
1. 每個區間是否 **被其他區間包含**。
2. 每個區間是否 **包含其他區間**。

輸出兩行：
- 第一行：每個區間是否包含其他區間（是為 1，否為 0）。
- 第二行：每個區間是否被其他區間包含（是為 1，否為 0）。

```
``` markdown
解法 : 

1. 區間排序
- 將所有區間依照：
  1. **左端點遞增排序**
  2. 左端點相同時，**右端點遞減排序**（較大的區間優先）

這樣能確保：
- 從左到右掃描：若 `r <= maxR`，該區間被包含。
- 從右到左掃描：若 `r >= minR`，該區間包含其他區間。

2. 演算法流程
    1. 讀入 `n` 個區間 `(l, r)` 並記錄原始索引。
    2. 排序後，建立：
       - `included[i]`: 是否被其他區間包含。
       - `includes[i]`: 是否包含其他區間。
    3. 從左到右：
       - 維護 `maxR`，若 `r <= maxR` → `included[i] = 1`
    4. 從右到左：
       - 維護 `minR`，若 `r >= minR` → `includes[i] = 1`

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int main() {
    fastio;
    int n;
    cin >> n;
    vector<pair<pair<int, int>, int>> ranges(n); // {{l, r}, original index}

    for (int i = 0; i < n; ++i) {
        int l, r;
        cin >> l >> r;
        ranges[i] = {{l, r}, i};
    }

    // 排序：左端點升序，右端點降序
    sort(ranges.begin(), ranges.end(), [](auto &a, auto &b) {
        if (a.first.first == b.first.first)
            return a.first.second > b.first.second;
        return a.first.first < b.first.first;
    });

    vector<int> includes(n), included(n);

    // 被包含者：從左往右掃
    int maxR = 0;
    for (int i = 0; i < n; ++i) {
        auto [l, r] = ranges[i].first;
        int idx = ranges[i].second;
        if (r <= maxR) included[idx] = 1;
        maxR = max(maxR, r);
    }

    // 包含者：從右往左掃
    int minR = INT_MAX;
    for (int i = n - 1; i >= 0; --i) {
        auto [l, r] = ranges[i].first;
        int idx = ranges[i].second;
        if (r >= minR) includes[idx] = 1;
        minR = min(minR, r);
    }

    for (int x : includes) cout << x << ' ';
    cout << '\n';
    for (int x : included) cout << x << ' ';
    cout << '\n';
}
```

## Nested Ranges Count [problem](https://cses.fi/problemset/task/2169)
```markdown
題目: 

給定 `n` 個區間，每個區間有左右端點 `(l, r)`，需要輸出：
1. 每個區間 **包含多少個其他區間**。
2. 每個區間 **被多少個其他區間包含**。

輸出兩行：
- 第一行：每個區間包含的區間數。
- 第二行：每個區間被包含的區間數。

```
``` markdown
解法 : 

1. 排序
- 先將所有區間依照以下規則排序：
  1. **左端點遞增**
  2. 若左端點相同 → **右端點遞減**（較大的區間優先）

這樣能確保在遍歷時，較大的區間會優先被處理，利於 BIT（Fenwick Tree）更新與查詢。

2. Fenwick Tree（BIT）
使用 BIT 來支援「前綴計數」：
- `add(x)`: 將位置 `x` 的計數 +1。
- `sum(x)`: 查詢 `[1, x]` 的計數總和。

為了使用 BIT，需要將右端點 `r` 進行 **座標壓縮**，避免直接用大數字當索引。

3. 演算法流程
    1. 讀入所有區間 `(l, r)`，並記錄原始索引。
    2. 對區間依規則排序。
    3. 建立 BIT 並處理兩個方向：
       - **計算包含數 (`contains`)：**
         - 從右到左遍歷。
         - 查詢 BIT 中右端點 ≤ 當前區間的數量 → 代表該區間可包含這些區間。
         - 將該區間右端點加入 BIT。
       - **計算被包含數 (`contained`)：**
         - 清空 BIT。
         - 從左到右遍歷。
         - 查詢 BIT 中右端點 < 當前區間的數量 → 計算被包含數。
         - 將該區間右端點加入 BIT。
         
4. 輸出結果。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

struct Interval {
    int l, r, idx;
};

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n;
    cin >> n;
    vector<Interval> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i].l >> a[i].r;
        a[i].idx = i;
    }

    // 1. 排序：左端點升序，右端點降序
    sort(a.begin(), a.end(), [](Interval &x, Interval &y) {
        if (x.l != y.l) return x.l < y.l;
        return x.r > y.r;
    });

    vector<int> contains(n), contained(n);
    vector<int> bit(n + 2);

    auto add = [&](int x) {
        for (; x < bit.size(); x += x & -x) bit[x]++;
    };
    auto sum = [&](int x) {
        int res = 0;
        for (; x > 0; x -= x & -x) res += bit[x];
        return res;
    };

    // 2. 座標壓縮 (右端點)
    vector<int> r_sorted;
    for (auto &it : a) r_sorted.push_back(it.r);
    sort(r_sorted.begin(), r_sorted.end());
    r_sorted.erase(unique(r_sorted.begin(), r_sorted.end()), r_sorted.end());

    auto get_r = [&](int r) {
        return lower_bound(r_sorted.begin(), r_sorted.end(), r) - r_sorted.begin() + 1;
    };

    // 3. 計算包含數 (右到左)
    for (int i = n - 1; i >= 0; i--) {
        int pos = get_r(a[i].r);
        contains[a[i].idx] = sum(pos);
        add(pos);
    }

    // 4. 計算被包含數 (左到右)
    fill(bit.begin(), bit.end(), 0);
    for (int i = 0; i < n; i++) {
        int pos = get_r(a[i].r);
        contained[a[i].idx] = i - sum(pos - 1);
        add(pos);
    }

    // 5. 輸出結果
    for (auto x : contains) cout << x << " ";
    cout << "\n";
    for (auto x : contained) cout << x << " ";
    cout << "\n";
}
```

## Room Allocation [problem](https://cses.fi/problemset/task/1164)
```markdown
題目: 

有 `n` 個顧客要入住飯店，每位顧客有：
- 到達時間 `arrive`
- 離開時間 `departure`

需要安排最少的房間數，並輸出：
1. 飯店所需的總房間數。
2. 每位顧客分配到的房號。
```
``` markdown
解法 : 

1. 事件排序
- 先將所有顧客依照到達時間 `arrive` 遞增排序，若相同則不特別處理，因為房間分配只看優先順序。

2. 優先佇列 (Priority Queue)
使用 **最大堆 (priority_queue)**，但存負的 `departure` 以模擬最小堆：
- 每個元素為 `{-離開時間, 房號}`。
- 佇列頂端的元素代表「最早可釋放的房間」。

3. 房間分配流程
    1. 初始化 `roomCnt = 0` 表示目前使用的房間數。
    2. 對每位顧客：
       - 若佇列為空，表示沒有房間 → 開新房間。
       - 否則檢查 `heap.top()`：
         - 如果 `heap.top().departure <= arrive`，房間可重複使用 → 指派該房間。
         - 否則 → 開新房間。
       - 將 `{-departure, 房號}` 推入堆中。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;

int main() {
    fastio;
    LL N;
    cin >> N;

    LL roomCnt = 0;
    priority_queue<pLL> s;
    vector<pair<pLL, LL>> time(N);
    vector<LL> roomName(N);

    for (int i = 0; i < N; ++i) {
        cin >> time[i].first.first >> time[i].first.second;
        time[i].second = i;
    }
    sort(time.begin(), time.end());

    for (int i = 0; i < N; ++i) {
        LL arrive = time[i].first.first, departure = time[i].first.second, index = time[i].second;
        if (s.empty()) {
            s.push({-departure, 1});
            roomName[index] = 1;
            roomCnt = max(roomCnt, LL(1));
            continue;
        }
        auto it = s.top();

        if (it.first <= -arrive) {  // 房間可重用
            s.push({-departure, it.second});
            s.pop();
            roomName[index] = it.second;
        } else {  // 開新房間
            s.push({-departure, ++roomCnt});
            roomName[index] = roomCnt;
        }
    }

    cout << roomCnt << '\n';
    for (auto e : roomName) {
        cout << e << ' ';
    }
}
```

## Factory Machines [problem](https://cses.fi/problemset/task/1620)
```markdown
題目: 

有 `N` 台機器，第 `i` 台機器生產一個產品需要 `arr[i]` 單位時間。  
目標是在最短的時間內生產至少 `K` 個產品，輸出這個最短時間。
```
``` markdown
解法 : 

1. 時間可行性檢查 (valid function)
若給定一個時間 `T`：
- 每台機器可生產的數量為 `⌊T / arr[i]⌋`
- 將所有機器的生產量加總，判斷是否 ≥ `K`

2. 二分搜尋 (Binary Search on Answer)
因為「時間 → 能否生產 K 個產品」是單調遞增的：
- 時間越長，越容易達到目標。
- 可用二分搜尋找最小的 `T`。

這裡採用「jump search」的寫法（等效於 binary search）：
1. 初始 `ans` 設為一個足夠大的值 (`2^60`)。
2. 由大到小依次減少「跳躍值」`jump`，嘗試縮小 `ans`。
3. 若 `valid(ans - jump)` 成立 → 更新 `ans -= jump`。

```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

vector<LL> arr;

bool valid(LL T, LL K, LL N) {
    LL sum = 0;
    for (int i = 0; i < N; ++i) {
        sum += T / arr[i];
        if (sum >= K) return true; // 提前結束
    }
    return false;
}

int main() {
    fastio;
    LL N, K;
    cin >> N >> K;
    arr.resize(N);

    for (int i = 0; i < N; ++i) cin >> arr[i];

    LL ans = LL(1) << 60; // 初始化大時間
    for (LL jump = LL(1) << 59; jump; jump >>= 1) {
        while (valid(ans - jump, K, N)) {
            ans -= jump;
        }
    }
    cout << ans;
}
```

## Tasks and Deadlines [problem](https://cses.fi/problemset/task/1630)
```markdown
題目: 

有 `N` 個工作，每個工作有：
- 時間 `arr[i]`
- 獎勵值 `r[i]`

工作時，你可以選擇任意順序來做。  
每當完成一本個工作，你會失去「累積工作時間」數量的獎勵值。  
請計算最終的「總獎勵」。
```
``` markdown
解法 : 

### 1. 觀察損失公式
假設工作的完成順序為 `a[1], a[2], ..., a[N]`：
- 做完第 1 個工作後，損失 `a[1]`
- 做完第 2 個工作後，損失 `a[1] + a[2]`
- ...
- 總損失 = Σ (做完第 k 個工作的累積時間)

因此，完成時間短的工作應該優先完成，以減少累積時間造成的獎勵損失。

### 2. 演算法
1. 讀入 `N` 個工作的 `(time, reward)`。
2. 將所有工作的時間 `time` 排序（獎勵值不影響順序）。
3. 先計算所有獎勵值總和 `reward`。
4. 從前到後累積時間 `Time`，並在每次完成時扣除該累積時間：
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
 fastio;
 LL N;
 cin >> N;
 LL reward = 0;
 vector<LL> arr(N);

 for (int i = 0; i < N; ++i) {
     LL r;
     cin >> arr[i] >> r;
     reward += r;  // 累積總獎勵
 }

 sort(arr.begin(), arr.end());

 LL Time = 0;
 for (int i = 0; i < N; ++i) {
     Time += arr[i];
     reward -= Time;
 }
 cout << reward;
}
```

## Reading Books [problem](https://cses.fi/problemset/task/1631)
```markdown
題目: 

有 `n` 本書，每本書的閱讀時間為 `a[i]`。  
有兩個人，可以同時閱讀兩本書，但同一本書不能被兩個人同時閱讀。  
請輸出兩個人都完成閱讀所有書所需的最短時間。
```
``` markdown
解法 : 

1. **觀察最短時間的下界**
   - 若所有書可依序閱讀 → 時間下界為 `sum`（所有書時間總和）。
   - 若有一本書過長 → 就算兩個人並行，其長度仍然限制了最短時間，必須至少是 `2 * max(a[i])`。

2. **最短時間**
   因此答案必須是： ans = max(sum, 2 * max(a[i]))
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
 fastio;
 int n;
 cin >> n;
 vector<long long> a(n);
 long long sum = 0, mx = 0;
 for (int i = 0; i < n; ++i) {
     cin >> a[i];
     sum += a[i];
     mx = max(mx, a[i]);
 }
 cout << max(sum, 2 * mx) << "\n";
}
```

## Sum of Three Values [problem](https://cses.fi/problemset/task/1641)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個目標值 `x`

請找出三個不同的索引 `i, j, k`，使得： `a[i] + a[j] + a[k] = x`
若有解，輸出這三個索引（任意順序）；若無解，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. 排序 + 雙指標
- 首先將所有數字與原本的索引一起存起來（為了最終輸出原始位置）。
- 依照數值大小排序陣列。
- 接著，枚舉第一個數字 `a[i]`，並在剩下的 `[i+1, n-1]` 之間利用雙指標 (`l`, `r`) 搜尋是否存在
  另外兩個數字湊成 `x`。

### 2. 具體流程
1. 對 `i` 從 `0` 到 `n-3`：
   - 設 `l = i+1`、`r = n-1`
   - 當 `l < r`：
     - 若 `a[i] + a[l] + a[r] == x` → 輸出三個索引並結束。
     - 若總和 < `x` → `l++`
     - 否則 → `r--`
2. 若全部搜尋後仍無解，輸出 `"IMPOSSIBLE"`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, int> pli;

int main() {
    fastio;
    int n;
    LL x;
    cin >> n >> x;

    vector<pli> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i].first;
        arr[i].second = i + 1; // 保留原始索引（1-based）
    }

    sort(arr.begin(), arr.end());

    for (int i = 0; i < n - 2; ++i) {
        int l = i + 1, r = n - 1;
        while (l < r) {
            LL sum = arr[i].first + arr[l].first + arr[r].first;
            if (sum == x) {
                cout << arr[i].second << ' ' << arr[l].second << ' ' << arr[r].second << '\n';
                return 0;
            } else if (sum < x) {
                ++l;
            } else {
                --r;
            }
        }
    }

    cout << "IMPOSSIBLE\n";
}
```

## Sum of Four Values [problem](https://cses.fi/problemset/task/1642)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個目標值 `x`

請找出三個不同的索引 `i, j, k, l`，使得： `a[i] + a[j] + a[k] + a[l] = x`
若有解，輸出這四個索引（任意順序）；若無解，輸出 `"IMPOSSIBLE"`。
```
``` markdown
解法 : 

### 1. 排序
- 先將所有數字與原本的索引存成 pair。
- 對陣列依數值大小排序，方便後續雙指標搜尋。

---

### 2. 外層枚舉 + 內層雙指標
- 外層先枚舉前兩個數字：
  - 第一層：`m` 從 `0` 到 `n-4`
  - 第二層：`i` 從 `m+1` 到 `n-3`
- 接著用雙指標 (`l`, `r`) 處理剩下的兩個數字：
  1. `l = i+1`
  2. `r = n-1`
  3. 計算 `sum = arr[m] + arr[i] + arr[l] + arr[r]`
     - 若 `sum == x` → 找到解答
     - 若 `sum < x` → `l++`
     - 若 `sum > x` → `r--`
  4. 若全部搜尋後仍無解，輸出 `"IMPOSSIBLE"`。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, int> pli;

int main() {
    fastio;
    int n;
    LL x;
    cin >> n >> x;

    vector<pli> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i].first;
        arr[i].second = i + 1; // 保留原始索引（1-based）
    }

    sort(arr.begin(), arr.end());

    for (int m = 0; m < n - 3; ++m) {
        for (int i = m + 1; i < n - 2; ++i) {
            int l = i + 1, r = n - 1;
            while (l < r) {
                LL sum = arr[m].first + arr[i].first + arr[l].first + arr[r].first;
                if (sum == x) {
                    cout << arr[m].second << ' ' 
                         << arr[i].second << ' '
                         << arr[l].second << ' '
                         << arr[r].second << '\n';
                    return 0;
                } else if (sum < x) {
                    ++l;
                } else {
                    --r;
                }
            }
        }
    }

    cout << "IMPOSSIBLE\n";
}
```

## Nearest Smaller Values [problem](https://cses.fi/problemset/task/1645)
```markdown
題目: 

給定一個長度為 `N` 的陣列 `arr`，對於每個位置 `i`，請找出：
- 在 `i` 左邊且比 `arr[i]` 小的最近一個位置。
- 若不存在，輸出 `0`。
```
``` markdown
解法 : 

### 1. 單調遞增堆疊（Monotonic Stack）
- 我們使用一個 stack 來記錄「候選位置」。
- 從右到左遍歷陣列：
  1. 當前元素 `arr[i]` 與 stack 頂端比較：
     - 若 stack.top 的值大於 `arr[i]` → 這些值的最近較小值就是 `i`，因此更新答案並 pop。
     - 否則停止。
  2. 將當前元素 `(arr[i], i)` 推入 stack。

---

### 2. 為什麼要從右到左？
- 因為題目要的是「左邊最近較小值」。
- 從右向左掃描，當遇到某個元素時，可以幫助堆疊中「右邊」的元素找到它們最近的較小值。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;
typedef pair<LL, LL> pLL;

const int SIZE = 2 * 1e5;
LL arr[SIZE + 50], ans[SIZE + 50];

int main() {
    fastio;
    LL N;
    cin >> N;
    arr[0] = -INT_MAX; // 虛擬邊界

    for (int i = 1; i <= N; ++i) {
        cin >> arr[i];
    }

    stack<pLL> s;
    for (int i = N; i >= 0; --i) {
        while (!s.empty()) {
            if (s.top().first > arr[i]) {
                ans[s.top().second] = i;
                s.pop();
            } else {
                break;
            }
        }
        s.push({arr[i], i});
    }

    for (int i = 1; i <= N; ++i) {
        cout << ans[i] << ' ';
    }
}
```

## Subarray Sums I [problem](https://cses.fi/problemset/task/1660)
```markdown
題目: 

給定：
- 一個長度為 `N` 的陣列 `arr`
- 一個目標和 `M`

請計算有多少個連續子陣列，其元素總和等於 `M`。
```
``` markdown
解法 : 

### 1. 兩指標（Sliding Window）
因為題目條件保證：
- 陣列中的數字為 **非負整數**。

這使得我們可以用兩指標（`l`, `r`）維護一個「滑動視窗」：
- 當 `curSum < M` → 擴展 `r`。
- 當 `curSum > M` → 收縮 `l`。
- 每次更新後檢查 `curSum == M`，若成立則計數。

這種方法避免了 `O(N^2)` 的暴力檢查，能在線性時間內完成。

---

### 2. 演算法流程
1. 初始化 `l = 0`，`curSum = 0`，`ans = 0`
2. 遍歷 `r` 從 `0` 到 `N-1`：
   - `curSum += arr[r]`
   - 若 `curSum == M` → 答案加 1
   - 若 `curSum > M` → 不斷移動 `l` 並減去 `arr[l]`，直到 `curSum <= M`
     - 若此時 `curSum == M` → 答案加 1
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)
typedef long long LL;

int main() {
    fastio;
    LL N, M;
    cin >> N >> M;

    vector<LL> arr(N);
    for (int i = 0; i < N; ++i) {
        cin >> arr[i];
    }

    LL curSum = 0, ans = 0;
    for (int l = 0, r = 0; r < N; r++) {
        curSum += arr[r];

        if (curSum == M) {
            ans++;
        } else if (curSum > M) {
            while (curSum > M) {
                curSum -= arr[l++];
            }
            if (curSum == M) {
                ans++;
            }
        }
    }
    cout << ans;
}
```

## Subarray Sums II [problem](https://cses.fi/problemset/task/1661)
```markdown
題目: 

給定：
- 一個長度為 `N` 的陣列 `arr`
- 一個目標和 `M`

請計算有多少個連續子陣列，其元素總和等於 `M`。
```
``` markdown
解法 : 

### 1. 前綴和 (Prefix Sum)
我們可以利用前綴和的性質：
sum[i, j] = prefix[j] - prefix[i-1]
如果要讓子陣列 `[i, j]` 的總和為 `x`，就必須滿足：
prefix[j] - prefix[i-1] = x
⇒ prefix[i-1] = prefix[j] - x
因此，我們可以在遍歷陣列時，同步記錄「某個前綴和出現的次數」。

---

### 2. 演算法流程
1. 建立一個 `map<long long, int> cnt`，紀錄前綴和的出現次數。
   - 初始化 `cnt[0] = 1`，代表「空前綴」。
2. 遍歷陣列：
   - 累加 `sum`。
   - 查詢 `cnt[sum - x]`，將其加到答案中（表示存在若干個前綴和可形成目標區間）。
   - 將 `cnt[sum]++` 更新。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, x;
    cin >> n >> x;
    vector<int> a(n);
    for (int &v : a) cin >> v;

    map<long long, int> cnt;
    cnt[0] = 1; // 空前綴
    long long sum = 0, ans = 0;

    for (int i = 0; i < n; ++i) {
        sum += a[i];
        ans += cnt[sum - x]; // 找到可形成目標的前綴
        cnt[sum]++;
    }

    cout << ans << '\n';
}
```

## Subarray Divisibility [problem](https://cses.fi/problemset/task/1662)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`

請計算有多少個連續子陣列的總和能被 `n` 整除。
```
``` markdown
解法 : 

### 1. 前綴和取模
如果子陣列 `[i, j]` 的總和能被 `n` 整除，必須滿足：
(prefix[j] - prefix[i-1]) % n == 0

等價於：
prefix[j] % n == prefix[i-1] % n

因此，只要計算每個前綴和的「模 n 值」出現的次數，就能統計所有合法子陣列。

---

### 2. 處理負數取模
因為前綴和可能為負數，因此：
mod_sum = ((sum % n) + n) % n

確保 `mod_sum` 始終為 `0 ~ n-1` 的非負值。

---

### 3. 演算法流程
1. 建立 `map<int, long long> cnt`，紀錄每個 `mod_sum` 出現次數。
   - 初始化 `cnt[0] = 1`（空前綴）。
2. 遍歷陣列：
   - 更新 `sum += a[i]`
   - 計算 `mod_sum = ((sum % n) + n) % n`
   - 將 `cnt[mod_sum]` 加到答案 `ans`
   - 更新 `cnt[mod_sum]++`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    map<int, long long> cnt;
    cnt[0] = 1; // 空前綴
    long long ans = 0, sum = 0;

    for (int i = 0; i < n; ++i) {
        sum += a[i];
        int mod_sum = ((sum % n) + n) % n; // 確保非負
        ans += cnt[mod_sum];
        cnt[mod_sum]++;
    }

    cout << ans << '\n';
}
```

## Distinct Values Subarrays II [problem](https://cses.fi/problemset/task/2428)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個整數 `k`

請計算有多少個子陣列，其中最多包含 `k` 個不同的數字。
```
``` markdown
解法 : 

### 1. 兩指標 + 雜湊表
我們用滑動視窗（`l`, `r`）搭配 `unordered_map` 來統計目前視窗內的元素頻率：
- 每次向右擴展 `r`，將 `a[r]` 加入計數。
- 若視窗內的不同數字數量超過 `k`，則不斷縮小 `l`，並更新頻率。

---

### 2. 計算子陣列數量
對於每個 `r`：
- 當 `cnt.size() <= k` 時，所有以 `r` 結尾的子陣列都是合法的。
- 這些子陣列的數量 = `r - l + 1`

將其加到答案中。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    unordered_map<int, int> cnt;
    long long ans = 0;
    int l = 0;

    for (int r = 0; r < n; ++r) {
        cnt[a[r]]++;
        while (cnt.size() > k) {
            cnt[a[l]]--;
            if (cnt[a[l]] == 0) cnt.erase(a[l]);
            l++;
        }
        ans += (r - l + 1);
    }

    cout << ans << '\n';
}
```

## Array Division [problem](https://cses.fi/problemset/task/1085)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `a`
- 一個整數 `k`

請將陣列切成 `k` 個或更少的連續子陣列，並使得「所有子陣列總和的最大值」最小化。  
輸出這個最小化後的最大子陣列和。
```
``` markdown
解法 : 

### 1. 二分搜尋答案
- 最小的可能答案是 `max(a)`（至少要能容納最大的單一元素）。
- 最大的可能答案是 `sum(a)`（把所有元素放在同一組）。
- 用二分搜尋檢查某個「最大子陣列和」是否可行。

---

### 2. 可行性檢查 (Greedy)
`check(x)`：
- 從左到右遍歷陣列，累積子陣列和。
- 如果加上當前元素會超過 `x` → 切分為新的子陣列。
- 計算分割次數 `cnt`。
- 若 `cnt <= k` → 代表可行。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    long long l = *max_element(a.begin(), a.end());
    long long r = accumulate(a.begin(), a.end(), 0LL);
    long long ans = r;

    auto check = [&](long long x) {
        int cnt = 1;
        long long sum = 0;
        for (int i = 0; i < n; ++i) {
            if (sum + a[i] > x) {
                cnt++;
                sum = a[i];
            } else {
                sum += a[i];
            }
        }
        return cnt <= k;
    };

    while (l <= r) {
        long long mid = (l + r) / 2;
        if (check(mid)) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    cout << ans << "\n";
}
```

## Movie Festival II [problem](https://cses.fi/problemset/task/1632)
```markdown
題目: 

給定：
- `n` 部電影，每部電影有開始時間 `a` 和結束時間 `b`
- `k` 個觀眾，每個觀眾不能同時看兩部重疊的電影

請計算最多可以觀看多少部電影（總計，不限觀眾順序）。
```
``` markdown
解法 : 

### 1. 貪心 + 多觀眾模擬
這題是 **Movie Festival I** 的延伸：
- 在單觀眾的情況下，我們用「按結束時間排序」+ 貪心法。
- 多觀眾的情況下，則需要追蹤每位觀眾「當前已看電影的結束時間」。

我們用一個 `multiset<int> ends` 來維護所有觀眾當前可接續的最晚結束時間。

---

### 2. 演算法流程
1. 將所有電影依照結束時間 `b` 排序（若相同，開始時間 `a` 不影響）。
2. 遍歷所有電影 `(a,b)`：
   - 在 `ends` 中找到 **第一個結束時間 > a** 的觀眾。
     - 若沒有符合的 → 檢查是否還能新增新的觀眾（`ends.size() < k`）。
   - 若找到 → 將該觀眾的結束時間更新為 `b`。
3. 每次成功分配一部電影給某個觀眾，`ans++`。

---

### 3. 為什麼要用 `upperbound`
- `upper_bound(a)` 找到第一個 **大於 `a`** 的結束時間。
- 若 `it != begin()` → `--it` 即為「小於等於 `a` 的最大結束時間」（能接這部電影）。
- 若 `it == begin()` → 沒有任何觀眾能接這部電影，檢查是否可新增觀眾。
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

int n, k;
vector<pair<int,int>> movies;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> k;
    for (int i = 0; i < n; ++i) {
        int a, b;
        cin >> a >> b;
        movies.emplace_back(b, a); // 按右端點排序
    }
    sort(movies.begin(), movies.end());

    multiset<int> ends; // 每位觀眾最後結束時間
    int ans = 0;

    for (auto [b, a] : movies) {
        auto it = ends.upper_bound(a); // 找 > a 的第一個
        if (it == ends.begin()) {
            if ((int)ends.size() < k) {
                ends.insert(b);
                ans++;
            }
        } else {
            --it; // 找到 <= a 的最大值
            ends.erase(it);
            ends.insert(b);
            ans++;
        }
    }

    cout << ans << "\n";
}
```

## Maximum Subarray Sum II [problem](https://cses.fi/problemset/task/1644)
```markdown
題目: 

給定：
- 一個長度為 `n` 的陣列 `x`
- 兩個整數 `a` 和 `b`，代表子陣列長度範圍 `[a, b]`

請找出長度在 `[a, b]` 之間的子陣列總和的最大值。
```
``` markdown
解法 : 

### 1. 前綴和
定義：
prefix[i] = x[1] + x[2] + ... + x[i]

若子陣列為 `[l, r]`：
sum(l, r) = prefix[r] - prefix[l-1]

若子陣列長度限制為 `[a, b]`：
l ∈ [r-b, r-a]
因此：sum(l, r) = prefix[r] - min(prefix[l-1]) for l-1 ∈ [r-b, r-a]
換句話說，對於每個 `r`，要找到 `prefix[j]` 的最小值（其中 `j` 在 `[r-b, r-a]`）。

---

### 2. 單調遞增雙端佇列 (Monotonic Deque)
用 `deque` 維護一個遞增的前綴和索引：
- 在 `r` 遞增時，先將 `prefix[r-a]` 加入窗口（可能成為候選最小值）。
- 移除所有超出 `r-b` 的舊索引。
- `deque.front()` 始終是當前窗口內的最小前綴和。
- 更新答案：`ans = max(ans, prefix[r] - prefix[dq.front()])`
```

``` cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, a, b;
ll x[200005], prefix[200005];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> a >> b;
    for (int i = 1; i <= n; ++i) {
        cin >> x[i];
        prefix[i] = prefix[i-1] + x[i];
    }

    ll ans = LLONG_MIN;
    deque<int> dq;

    for (int r = a; r <= n; ++r) {
        // 把 prefix[r-a] 加進窗口
        while (!dq.empty() && prefix[dq.back()] >= prefix[r-a])
            dq.pop_back();
        dq.push_back(r-a);

        // 移除窗口外的元素
        while (!dq.empty() && dq.front() < r-b)
            dq.pop_front();

        ans = max(ans, prefix[r] - prefix[dq.front()]);
    }

    cout << ans << "\n";
}
```