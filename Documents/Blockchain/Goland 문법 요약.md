# Golang 문법 요약

**README: 20200421 진행중(미완)**

Reference

- [https://go-tour-ko.appspot.com](https://go-tour-ko.appspot.com/methods/4)

### Import

```go
// 여러줄로
import "fmt"
import "math"

// 더 나은 스타일 (factored)
import (
	"fmt"
	"math"
)
```

### 함수

```go
// 리턴형 int인 add 함수
func add(x int, y int) int {
	return x + y
}

// 매개변수 타입이 같을 경우 생략
func add(x, y int) int {
	// do something
}

// 복수 출력
func sawp(x, y string) (string, string) {
	return y, x
}

// 리턴 미리 구성
// 짧은 함수에만 사용. 가독성 떨어짐
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return // 리턴 생략
}
```

### 변수

```go
// 기본 값 0, bool, "" 등 빈 값
var c, python, java bool

// 초기화
// 초기값이 정해져 있다면 type 생략 가능
var c, python, java = true, false, "no"

// 함수 내 짧은 변수 선언
c, python, java := true, false, "no"
```

### Type 변환

```go
// 타입 변환이 필요한 경우 Type(n) 명시 필요
var f := 3.14
var n := int(f)
```

### 상수

```go
// 상수는 := 문법 사용 불가
const c = 3
const str = "test"
```

### Numeric Constants

```go
// type이 정해져 있지 않은 상수는 문맥에 필요한 type을 취한다
const Num = 1 << 10

func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	// type이 정해져있다면 캐스팅 필요
	fmt.Println(needFloat(Num))
}
```

### 반복문

```go
// 기본 문법
for i := 0; i < 10; i++ {
	// do something
}

// while문 처럼
for ; i < 10 ; {
 // do something
}

// 간소화
for i < 10 {
 // do something
}

// 무한 루프
for {
	// do something
}
```

### 조건문 if, else

```go
// 기본 문법
if v < lim {
	// do something
}

// if 스코프 내 사용하는 변수 선언
if v := math.Pow(x, n); v < lim {
	// do something
else {
	// do something else
	// can use v
}
```

### Switch

```go
// 동일하에 초기값 설정 가능
// Golang은 자동 break 제공
switch os := runtime.GOOS; os {
case "darwin":
	fmt.Println("OS X.")
case "linux":
	fmt.Println("Linux.")
default:
	fmt.Println("%s. \n", os)
}

// 조건 없는 switch == swtich true
// 긴 if-else 체인을 깔끔하게 작성할 수 있다
swith {
case t.Hour() < 12:
	fmt.Println("morning")
case t.Hour() < 17:
	fmt.Println("afternoon")
default:
	fmt.Println("evening")
}
```

### Defer

```go
// 현재 스코프의 함수가 종료될 때 까지 작업 연기
// 작업은 스택에 쌓인다 (LIFO)
defer fmt.Println("!")
defer fmt.Println("World")
fmt.Println("Hello")
// print Hello\nWorld\n!\n
```

### Pointers

```go
// C의 동장 방식과 유사
// 대신 포인터 산술 연산은 지원하지 않음 (ex. *(p+1))
i := 42
p := &i // point to i
fmt.Println(*p) // read i through the pointer
*p = 21 // set i through the pointer
```

### Structs

```go
type Node struct {
	X int
	Y int
}

fmt.Println(Node{1, 2}) // print {1 2}

v := Node{1, 2}
fmt.Println(v.X) // print 1
```

### Pointers to structs

```go
v := Node{1, 2}
p := &v
// 정식 표기법은 (*p).X
// go에서 쉬운 문법을 제공
// C에서는 p->X가 가능하지만 go는 불가능
p.X = 1e9
fmt.Println(v)
```

### Struct Literals

```go
var (
	v1 = Node{1, 2}  // has type Node
	v2 = Node{X: 1}  // Y:0 is implicit
	v3 = Node{}      // X:0 and Y:0
	p  = &Node{1, 2} // has type *Node
)

func main() {
	fmt.Println(v1, p, v2, v3) // {1 2} &{1 2} {1 0} {0 0}
}
```

### Arrays

```go
// 타입이 int인 n개의 연속된 메모리(배열)
// 배열의 크기 조절 불가능
var a [10]int

var a [2]string
a[0] = "Hello"
a[1] = "World"
fmt.Println(a[0], a[1]) // Hello World
fmt.Println(a) // [Hello World]

primes := [6]int{2, 3, 5, 7, 11, 13}
fmt.Println(primes) // [2 3 7 8 11 13]
```

### Slices

```go
// pyhon의 slice와 동일
primes := [6]int{2, 3, 5, 7, 11, 13}
var s []int = primes[1:4]
fmt.Println(s) // [3 5 7]
```

### Slices are like references to arrays (배열을 참조하는 슬라이스)

```go
// 슬라이스는 배열을 하드카피 하는 것이 아닌, 참조할 뿐이다
// 때문에 참조값이 변경되면 참조중인 모든 값이 변경된다
names := [4]string{"John", "Paul", "George", "Ringo",}
fmt.Println(names) // [John Paul George Ringo]

a := names[0:2]
b := names[1:3]
fmt.Println(a, b) // [John Paul] [Paul George]

b[0] = "XXX"
fmt.Println(a, b) // [John XXX] [XXX George]
fmt.Println(names) // [John XXX George Ringo]
```

### Slice literals

```go
// 배열 리터럴
[3]bool{true, true, false]
// 슬라이스 리터럴
// 길이가 없는 배열 리터럴
[]bool{true, true, false}

// struct를 정의하며 슬라이스 생성
s := []struct {
	i int
	b bool
}{
	{2, true},
	{3, false},
	{5, true},
	{7, true},
	{11, false},
	{13, true},
}
fmt.Println(s) // [{2 true} {3 false} {5 true} {7 true} {11 false} {13 true}]
```

### Slice default

```go
// python과 마찬가지로 상한, 하한선을 생략할 수 있다
// a[:], a[0:], a[:10], a[0:10]
```

### Slice length and capacity

```go
// 슬라이스는 length와 capacity를 둘 다 가지고 있다
// len(s), cap(s)
// 길이 연장을 위해선 충분한 용량이 있을 때, 다시 슬라이싱으로 연장 가능

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// Extend its length.
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// Drop its first two values.
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

### Nil slices

```go
// 슬라이스의 길이와 용량이 0인 것을 nil slice이라고 함
// 다른 언어의 null과 같다
var s []int
if s == nil {
	// do something
}
```

### Creating a slice with make

```go
// 동적 배열을 생성하는 방법
a := make([]int, 5) // len(a) = 5
b := make([]int, 0, 5) // len(b) = 0, cap(b) = 5

// 길이 조절
b = b[:cap(b)]
```

### Slices of slices

```go
// 다른 슬라이스를 요소로 하는 슬라이스
// C의 다차원 배열과 같다

// Create a tic-tac-toe board.
board := [][]string{
	[]string{"_", "_", "_"},
	[]string{"_", "_", "_"},
	[]string{"_", "_", "_"},
}

// The players take turns.
board[0][0] = "X"
board[2][2] = "O"
board[1][2] = "X"
board[1][0] = "O"
board[0][2] = "X"
```

### Appending to a slice

```go
// 슬라이스에 새로운 요소를 추가
// capacity가 부족할 경우 새로운 배열 할당, 새로운 배열을 가리킨다
// func append(a []T, vs ...T) []T

func main() {
	var s []int
	printSlice(s) // len=0 cap=0 []

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s) // len=1 cap=1 [0]

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s) // len=2 cap=2 [0 1]

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s) // len=5 cap=6 [0 1 2 3 4]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

### Range

```go
// for에서 range는 슬라이스 또는 맵의 요소들을 순회
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, el := range pow {
	fmt.Println("2**%d = %d\n", i, v)
}

// 값 생략 가능
for _, el := range pow {
	// do something
}

// 인덱스만 원할경우
for i := range pow {
	// do something
}
```

진행중

[https://go-tour-ko.appspot.com/moretypes/18](https://go-tour-ko.appspot.com/moretypes/18)

### Method?

```go
// go에는 class가 존재하지 않는다
// 대신 reciver라는 유형이 존재한다
// Method는 리시버 인수가 있는 함수이다

type Vertex struct {
	X, Y float64
}

// 일반 함수로 작성된 Abs 함수
func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}

// Method
// 해당 타입내에 함수를 정의하는 느낌
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}

// 구조체 뿐만 아니라 일반 타입도 가능
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

### 포인터 리시버

```go
// 자체 값을 바꾸기 위해서 포인터 리시버가 필요하다
// 일반 리시버는 값복사이기 때문
func (v Node) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Node) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
```

진행중

[https://go-tour-ko.appspot.com/methods/6](https://go-tour-ko.appspot.com/methods/6)