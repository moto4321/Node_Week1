# Node_Week1
## 노드js 1주차 개인과제

### [demo site](http://woooseogi.shop/)

<br />

간단한 게시물과 댓글을 작성할 수 있는 사이트입니다.

<br />

## 게시물 관련 API
|기능|API|Method|request|response  
|---|---|---|---|---|  
|전체 게시물 가져오기|/posts|GET| - | - 
|게시물 하나 가져오기|/posts/:postId|GET| - | - 
|게시물 올리기|/posts|POST| 
|게시물 삭제|/posts/:postId|POST|  
|수정할 게시물 가져오기|/posts/update/:postId|GET|  
|게시물 수정하기|/posts/:postId|PATCH  

<br />

## 댓글 관련 API
|기능|API|Method|request|response  
|---|---|---|---|---|
|댓글 하나 가져오기|/comments/:postId/:commentId|GET| - | - |
|댓글 작성하기|/comments/:postId|POST| - | - |
|댓글 삭제하기|/comments/:postId/:commentId|POST| - | - |
|댓글 수정하기|/comments/:postId/:commentId|PATCH| - | - |

