;; ** 使用说明

;; - 从网络上下载程序的源代码
;;   - 最新版本
;;     #+BEGIN_EXAMPLE
;;     ipfs get /ipns/QmaZR1DrXFdwboew17giPKFEFNbBLn55H5MhgnRU3qRZaj -o ~/.emacs.d/site-lisp/diigo-client-on-emacs-lisp
;;     #+END_EXAMPLE
;;   - 某个版本
;;     #+BEGIN_EXAMPLE
;;     ipfs get /ipfs/QmbPiNyUEMvZkb3HaS1M3HvHGeuYg4inBmNifg2v5itUwP -o ~/.emacs.d/site-lisp/diigo-client-on-emacs-lisp
;;     #+END_EXAMPLE
;;   - https://gitee.com/sundawning/sundawning.gitee.io/blob/master/projects/diigo-client-on-emacs-lisp
;; - 在浏览器里登录Diigo并获取cookie
;;   形如：Cookie:gcc_cookie_id=2e85327075
;;   - 保存到"~/literate-programming/diigo-cookie"里
;;   - 或者直接设置＂*gloss-cookie*＂的值
;; - 加载并配置程序
;;   #+NAME: gloss-user
;;   #+BEGIN_EXAMPLE
;;   (add-to-list 'load-path
;;                "~/.emacs.d/site-lisp/diigo-client-on-emacs-lisp/")

;;   (require 'gloss-autoload)

;;   (setf *gloss-cookie-file* "~/literate-programming/diigo-cookie")

;;   (setf *gloss-using-default-cookie-file-p* t)

;;   (dolist (hook '(eww-mode-hook elfeed-show-mode-hook))
;;     (add-hook
;;      hook
;;      (lambda ()
;;        (local-set-key (kbd "b")
;;                       'gloss-save-current-page-to-bookmark)
;;        (local-set-key (kbd "B")
;;                       'gloss-save-current-page-to-private-bookmark))))
;;   #+END_EXAMPLE
;; - 查询最近的书签
;;   1. ~M-x gloss-recent-bookmarks~
;;   2. 输入要显示数量，默认是1
;;   3. 回车，等候弹出＂*Diigo Bookmarks*＂窗口
;; - 查询
;;   1. ~M-x gloss-search-bookmarks~
;;   2. 输入要搜索的内容
;;   3. 输入要显示的数量
;;   4. 回车，等候弹出＂*Diigo Bookmarks*＂窗口
;; - 保存当前网页到书签
;;   1. 用ＥＷＷ浏览网页，需要快速收藏网页，用elfeed查看内容时，收藏原文
;;   2. ~M-x gloss-save-current-page-to-bookmark~
;;   3. 输入心得体会、注解，目的是便于日后用＂gloss-search-bookmarks＂搜索
;;   4. 回车
;; - 使用Yasnippet编辑书签表单
;;   1. ~M-x gloss-edit-bookmark~
;;   2. 编辑Emacs Lisp代码
;;   3. 使用 ~Tab~ 便捷切换到下一个需要输入位置，使用 ~Shitf Tab~ 便捷切换到上一个输入的内容。
;;   4. 可反复编辑，可自由填写、扩充合法的Emacs Lisp代码
;;   5. 确定无误后， ~M-x gloss-edit-bookmark-save~ 提交
;; - 查询当前eww页面里已有的书签： ~M-x gloss-search-eww-current-url~
;; - 启用自动查询当前eww页面已有的书签： ~M-x gloss-add-eww-after-render-hook~
;; - 关闭自动查询当前eww页面已有的书签： ~M-x gloss-remove-eww-after-render-hook~
;; - 更多功能在： ~M-x gloss-~


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*使用说明][使用说明:1]]


;; 使用说明:1 ends here
;; ** BOF


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*BOF][BOF:1]]
(mapc (function require)
      '(cl-lib eww yasnippet org elisp-format ace-link view json))

;; BOF:1 ends here
;; *** 文件的读写


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*文件的读写][文件的读写:1]]
(cl-defun gloss-file-to-string (filespec)
  (with-temp-buffer
    (insert-file-contents filespec)
    (buffer-string)))

;; 文件的读写:1 ends here
;; **** 属性列表=>关联列表


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*属性列表=>关联列表][属性列表=>关联列表:1]]
(cl-defun gloss--plist-to-alist (plist)
  (let ((result '()))
    (cl-labels ((f (l)
                   (unless (< (length l)
                              1)
                     (push (cl-subseq l 0 2)
                           result)
                     (f (cl-subseq l 2)))))
      (f plist))
    result))

;; 属性列表=>关联列表:1 ends here
;; **** 关联列表=>结构对

;; 虽然结构对是关联列表，但不是所有的关联列表都是结构对，只有长度为2的关联列表才能转换成结构对。


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*关联列表=>结构对][关联列表=>结构对:1]]
(cl-defun gloss--alist-to-cons (alist)
  (cl-mapcar (lambda (pair)
               (cl-destructuring-bind (key value)
                   pair
                 (cons (cl-subseq (prin1-to-string key)
                                  1)
                       value)))
             alist))

;; 关联列表=>结构对:1 ends here
;; **** 属性列表=>结构对


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*属性列表=>结构对][属性列表=>结构对:1]]
(cl-defun gloss--plist-to-cons (plist)
  (gloss--alist-to-cons
   (gloss--plist-to-alist plist)))

;; 属性列表=>结构对:1 ends here
;; ***** 一个列表=>字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*一个列表=>字符串][一个列表=>字符串:1]]
(cl-defun gloss--list-to-string (list &optional (seperator " "))
  "值域∈｛字符串｝"
  (if (and (listp list)
           (not
            (null list)))
      (cl-concatenate
       (quote string)
       (unless (gloss--null-string-p (car list))
         (prin1-to-string (car list)))
       (when (cdr list)
         seperator)
       (gloss--list-to-string (cdr list)
                              seperator))
    ""))

;; 一个列表=>字符串:1 ends here
;; ***** 多个列表=>字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*多个列表=>字符串][多个列表=>字符串:1]]
(cl-defun gloss--lists-to-string (lists)
  (gloss--list-to-string
   (cl-remove-duplicates
    (apply (function cl-concatenate)
           'list
           lists)
    :test (function string-equal))))

;; 多个列表=>字符串:1 ends here
;; ***** 美化：一个列表=>字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*美化：一个列表=>字符串][美化：一个列表=>字符串:1]]
(cl-defun gloss-format--list-to-string (list)
  (with-temp-buffer
    (emacs-lisp-mode)
    (insert
     (format "%S" list))
    (elisp-format-buffer)
    (buffer-string)))

;; 美化：一个列表=>字符串:1 ends here
;; **** 布尔值=>字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*布尔值=>字符串][布尔值=>字符串:1]]
(cl-defun gloss--t-to-true (lisp-boolean)
  (cl-case lisp-boolean
    ('t "true")
    ('nil "false")))

;; 布尔值=>字符串:1 ends here
;; **** 局部变量


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*局部变量][局部变量:1]]
(defun gloss--set-local (symbol value)
  (if (functionp (function org-set-local))
      (org-set-local symbol value)
    (set (make-local-variable symbol)
         value)))

;; 局部变量:1 ends here
;; **** 函数名=>按键


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*函数名=>按键][函数名=>按键:1]]
(cl-defun gloss--key-binding (symbol)
  "顺着`describe-function'在`help-fns--key-bindings'找到的。"
  (mapconcat 'key-description
             (where-is-internal symbol overriding-local-map nil nil)
             ""))

;; 函数名=>按键:1 ends here
;; **** 删除换行符


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*删除换行符][删除换行符:1]]
(cl-defun gloss--remove-newline (string)
  (cl-reduce (lambda (i j)
               (format "%s %s" i j))
             (split-string string
                           "
")))

;; 删除换行符:1 ends here
;; **** 删除空格


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*删除空格][删除空格:1]]
(cl-defun gloss--remove-whitespace (string)
  (cl-reduce (lambda (i j)
               (format "%s%s" i j))
             (split-string string
                           (format " "))))

;; 删除空格:1 ends here
;; **** 空的字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*空的字符串][空的字符串:1]]
(cl-defun gloss--null-string-p (string)
  (or (not string)
      (zerop
       (length string))
      (zerop
       (length
        (gloss--remove-whitespace
         (gloss--remove-newline string))))))

;; 空的字符串:1 ends here
;; **** 身份识别


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*身份识别][身份识别:1]]
(defvar *gloss-additional-headers* '())

(defvar *gloss-cookie* nil)

(cl-defun gloss-additional-headers (cookie)
  "`cookie'∈｛登录成功后浏览器里的Cookie值｝，形如：\"Cookie:gcc_cookie_id=2e85327075\""
  (let ((cookie (or *gloss-cookie* cookie)))
    (when cookie
      (setf *gloss-additional-headers*
            (list (cons "cookie" cookie)
                  (cons "X-Requested-With" "XMLHttpRequest"))))))

;; 身份识别:1 ends here
;; **** 访问网页


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*访问网页][访问网页:1]]
(cl-defun gloss--http-request
    (uri &rest args
         &key (method :get)
         parameters
         additional-headers)
  "仿照Common Lisp包`drakma:http-request'所得到
`值域'∈｛`string'｝
`uri'∈｛`string'｝
`method'∈｛`string',`keyword'｝
`parameters'∈｛`string',`alist'｝
`additional-headers'∈｛`string',`alist'｝"
  (let ((url-request-method
         (upcase
          (cl-typecase method
            (string method)
            (keyword (cl-subseq (format "%s" method)
                                1)))))
        (url-request-extra-headers
         (let ((alist
                (cl-typecase additional-headers
                  (null nil)
                  (list additional-headers)
                  (string
                   (cl-remove
                    'nil
                    (cl-mapcar
                     (lambda (item)
                       (cl-destructuring-bind (key value)
                           (split-string item "\\(: \\)" t)
                         (unless (cl-find
                                  key
                                  '("Content-Length" "Connection" "Cache-Control")
                                  :test (function equal))
                           (cons key value))))
                     (split-string additional-headers "\n" t)))))))
           (dolist (pair '(("Content-Type" . "application/x-www-form-urlencoded")))
             (unless (cl-assoc
                      (downcase
                       (car pair))
                      alist
                      :test (function equal)
                      :key (function downcase))
               (push pair alist)))
           alist))
        (url-request-data
         (cl-typecase parameters
           (null nil)
           (string parameters)
           (list (mapconcat
                  (lambda (pair)
                    (format
                     "%s=%s"
                     (car pair)
                     (url-hexify-string
                      (url-unhex-string
                       (format
                        "%s"
                        (cdr pair))))))
                  parameters
                  "&")))))
    (with-current-buffer (url-retrieve-synchronously uri nil t)
      (set-buffer-multibyte t)
      (goto-char (point-min))
      (re-search-forward (format "\n\n"))
      (delete-region (point-min) (point))
      (buffer-string))))

;; 访问网页:1 ends here
;; **** 百度分词


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*百度分词][百度分词:1]]
(cl-defun gloss-baidu--string-to-list (string)
  ;; "https://jingyan.baidu.com/ajax/exp/AutoTag"
  (unless (gloss--null-string-p string)
    (let ((response (gloss--http-request
                     "https://jingyan.baidu.com/ajax/exp/AutoTag"
                     :method :post
                     :parameters (list
                                  (cons "title" (gloss--remove-newline string))))))
      (unless (gloss--null-string-p response)
        (cl-coerce (cdr
                    (cl-assoc (car
                               (read-from-string "tagList"))
                              (json-read-from-string response)))
                   'list)))))

;; 百度分词:1 ends here
;; **** Diigo分词


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*Diigo分词][Diigo分词:1]]
(cl-defun gloss-diigo--string-to-list (string additional-headers)
  (when (and (not (gloss--null-string-p string))
             additional-headers)
    (let ((response (gloss--http-request
                     "https://www.diigo.com/tag_mana2/load_recommended_tags"
                     :method :post
                     :additional-headers additional-headers
                     :parameters (list
                                  (cons "url" "")
                                  (cons "title" (gloss--remove-newline string))))))
      (unless (gloss--null-string-p response)
        (cl-coerce (cdr
                    (car
                     (json-read-from-string response)))
                   'list)))))

;; Diigo分词:1 ends here
;; **** 按关键字筛选JSON字符串


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*按关键字筛选JSON字符串][按关键字筛选JSON字符串:1]]
(cl-defun gloss-json--string-to-list (string)
  (when (stringp string)
    (cl-coerce (cdr
                (cl-assoc 'items
                          (json-read-from-string string)))
               'list)))

;; 按关键字筛选JSON字符串:1 ends here
;; ***** 书签的标题

;; 在只存在网址的时候，也能根据网址从网络上获取标题。


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*书签的标题][书签的标题:1]]
(defun gloss--title (url title)
  "∈{string,nil}
来自`eww-tag-title'"
  (unless (fboundp 'string-blank-p)
    (require 'subr-x))
  (if (and (stringp title)
           (not (string-blank-p title)))
      title
    (when (stringp url)
      (let* ((dom (with-temp-buffer
                    (insert (gloss--http-request url))
                    (libxml-parse-html-region (point-min) (point-max))))
             (title (dom-by-tag dom 'title))
             (text (dom-text title))
             (filter (replace-regexp-in-string "^ \\| $" "" (replace-regexp-in-string "[ \t\r\n]+" " " text))))
        (unless (equal filter "")
          filter)))))

;; 书签的标题:1 ends here
;; ***** 书签的标签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*书签的标签][书签的标签:1]]
(defun gloss--tags (title description tags &optional additional-headers)
  (gloss--lists-to-string
   (cl-mapcar (lambda (list)
                (cl-remove-if (function gloss--null-string-p)
                              list))
              (list (gloss-baidu--string-to-list title)
                    (gloss-baidu--string-to-list description)
                    (gloss-diigo--string-to-list title additional-headers)
                    tags))))

;; 书签的标签:1 ends here
;; ***** 书签的描述


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*书签的描述][书签的描述:1]]
(cl-defun gloss-description--format (description)
  (if (gloss--null-string-p description)
      ""
    (let ((date (format-time-string "<%Y-%m-%d %a %H:%M:%S UTC%:z>")))
      (format "--> %s
%s
<-- %s"
              date description date))))

;; 书签的描述:1 ends here
;; ***** 书签的表单


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*书签的表单][书签的表单:1]]
(cl-defun gloss--form (url &key title description tags lists groups private unread additional-headers)
  (list (cons "url" url)
        (cons "title" (gloss--title url title))
        (cons "description" (or description ""))
        (cons "tags" (gloss--tags title description tags additional-headers))
        (cons "lists" (gloss--list-to-string lists))
        (cons "groups" (cl-typecase groups
                         (list (gloss--list-to-string groups))
                         (string groups)))
        (cons "private" (gloss--t-to-true private))
        (cons "unread" (gloss--t-to-true unread))))

;; 书签的表单:1 ends here
;; ***** 保存新书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*保存新书签][保存新书签:1]]
(cl-defun gloss-save-bookmark--request (form additional-headers)
  (gloss--http-request
   "https://www.diigo.com/item/save/bookmark"
   :method :post
   :additional-headers additional-headers
   :parameters form))

;; 保存新书签:1 ends here
;; ***** 判断书签是否存在


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*判断书签是否存在][判断书签是否存在:1]]
(cl-defun gloss--unique-p (url additional-headers)
  (let ((items (gloss-json--string-to-list
                (gloss-search-bookmarks--request url 10 additional-headers))))
    (when items
      (car
       (cl-remove-if-not (lambda (item)
                           (equal (alist-get 'url item)
                                  url))
                         items)))))

;; 判断书签是否存在:1 ends here
;; ***** 提取旧书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*提取旧书签][提取旧书签:1]]
(defun gloss--old-form (bookmark &optional additional-headers)
  (cl-destructuring-bind (url title description tags lists groups private unread)
      (mapcar (lambda (key)
                (cdr
                 (cl-assoc key bookmark)))
              '(url title description tags outliners_id groups private readed))
    (gloss--form url
                 :additional-headers additional-headers
                 :title title
                 :description description
                 :tags (split-string tags ",")
                 :lists (cl-coerce lists 'list)
                 :groups (cl-coerce groups 'list)
                 :private (cl-case private
                            (:json-false 'nil)
                            (:json-true 't))
                 :unread (cl-case unread
                           (1 'nil)
                           (0 't)))))

;; 提取旧书签:1 ends here
;; ***** 合并新旧标签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*合并新旧标签][合并新旧标签:1]]
(cl-defun gloss--merge-tags (old-tags new-tags)
  (gloss--lists-to-string
   (cl-mapcar (lambda (tags)
                (cl-remove-if (function gloss--null-string-p)
                              (split-string tags "\"")))
              (list old-tags new-tags))))

;; 合并新旧标签:1 ends here
;; ***** 合并新旧书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*合并新旧书签][合并新旧书签:1]]
(cl-defun gloss--merge-forms (old-form new-form)
  (cl-mapcar (lambda (old new)
               (let ((key (car old))
                     (old-value (cdr old))
                     (new-value (cdr new)))
                 (cons key
                       (cl-ecase (car
                                  (read-from-string key))
                         ((url title lists)
                          old-value)
                         ((groups)
                          (if (gloss--null-string-p new-value)
                              old-value
                            new-value))
                         ((description)
                          (cond ((gloss--null-string-p new-value)
                                 old-value)
                                ((gloss--null-string-p old-value)
                                 new-value)
                                (t (format "%s\n\n%s" old-value new-value))))
                         ((tags)
                          (gloss--merge-tags old-value new-value))
                         ((private unread)
                          new-value)))))
             old-form new-form))

;; 合并新旧书签:1 ends here
;; **** 保存新／新旧书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*保存新／新旧书签][保存新／新旧书签:1]]
(defvar *gloss-save-bookmark-hook* nil "∈{symbol}
function∈{(lambda (url title description tags) body)}
hook runs in `gloss--save-bookmark' and uses some of its arguments")

(cl-defun gloss--save-bookmark
    (url title description tags lists groups private unread additional-headers hook)
  (let ((form
         (let ((bookmark (gloss--unique-p url additional-headers))
               (new-form (gloss--form
                          url
                          :additional-headers additional-headers
                          :title title
                          :description (gloss-description--format description)
                          :tags tags
                          :lists lists
                          :groups groups
                          :private private
                          :unread unread)))
           (if bookmark
               (gloss--merge-forms (gloss--old-form bookmark additional-headers)
                                   new-form)
             new-form))))
    (when form
      (let ((response (gloss-save-bookmark--request form additional-headers)))
        (let ((title (cdr (cl-assoc "title" form :test 'equal)))
              (tags (split-string (cdr (cl-assoc "tags" form :test 'equal))
                                  "[\" ]" t)))
          (run-hook-with-args hook url title description tags))
        response))))

(cl-defun gloss-save-bookmark
    (url &key title description tags lists groups private unread additional-headers)
  (gloss--save-bookmark url title description tags lists groups private unread additional-headers nil))

(cl-defun gloss-save-bookmark-with-hook
    (url &key title description tags lists groups private unread additional-headers)
  (gloss--save-bookmark url title description tags lists groups private unread additional-headers '*gloss-save-bookmark-hook*))

(cl-defun gloss-background-save-bookmark (&rest rest)
  (gloss-background--apply (function gloss-save-bookmark) rest))

(cl-defun gloss-background-save-bookmark-with-hook (&rest rest)
  (gloss-background--apply (function gloss-save-bookmark-with-hook) rest))

;; 保存新／新旧书签:1 ends here
;; **** 查询最近书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*查询最近书签][查询最近书签:1]]
(cl-defun gloss-recent-bookmarks--request (count additional-headers)
  (gloss--http-request
   "https://www.diigo.com/interact_api/load_user_items"
   :additional-headers additional-headers
   :parameters (list (cons "sort" "updated")
                     (cons "count" count))))

;; 查询最近书签:1 ends here
;; **** 按关键字查询书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*按关键字查询书签][按关键字查询书签:1]]
(cl-defun gloss-search-bookmarks--request (what count additional-headers)
  (gloss--http-request
   "https://www.diigo.com/interact_api/search_user_items"
   :additional-headers additional-headers
   :parameters (list (cons "what" what)
                     (cons "sort" "updated")
                     (cons "count" count)
                     (cons "format" "json"))))

;; 按关键字查询书签:1 ends here
;; **** 打印书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*打印书签][打印书签:1]]
(cl-defun gloss--format (bookmarks)
  (mapcar (lambda (item)
            (apply (function format)
                   "
>>>
--- 标题：%s
--- 链接：%s
--- 标签：%s
--- 注释：%s
--- 描述：%s
<<<
"
                   item))
          (mapcar (lambda (item)
                    (mapcar (lambda (key)
                              (cdr
                               (cl-assoc key item)))
                            '(title url tags comments description)))
                  (gloss-json--string-to-list bookmarks))))

;; 打印书签:1 ends here
;; *** 后台执行


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*后台执行][后台执行:1]]
(cl-defun gloss-background--apply (function arguments)
  (if (fboundp 'background-eval)
      (background-eval
       `(apply ',function ',arguments))
    (apply function arguments)))

;; 后台执行:1 ends here
;; *** gloss-view-mode


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*gloss-view-mode][gloss-view-mode:1]]
(define-derived-mode gloss-view-mode org-mode "GLOSS"
  (let ((keymap (copy-keymap view-mode-map)))
    (cl-labels ((define-keys (configs)
                  (dolist (config configs)
                    (define-key keymap
                      (kbd (cl-first config))
                      (cl-second config)))))
      (define-keys
        '(("q" gloss-kill-this-buffer)
          ("f" gloss-ace-link))))
    (set (make-local-variable (quote truncate-partial-width-windows))
         nil)
    (use-local-map keymap)))

;; gloss-view-mode:1 ends here
;; **** 从文件加载登录信息


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*从文件加载登录信息][从文件加载登录信息:1]]
(defvar *gloss-cookie-file*
  (expand-file-name "diigo-cookie"
                    (file-name-directory
                     (find-library-name "gloss"))))

(defvar *gloss-using-default-cookie-file-p* nil
  "是否使用默认的Cookie来登录")

(cl-defun gloss--read-cookie-file ()
  (or *gloss-additional-headers*
      (gloss-additional-headers
       (or
        *gloss-cookie*
        (gloss-file-to-string
         (or (let ((file *gloss-cookie-file*))
               (when (file-exists-p file)
                 (when (or *gloss-using-default-cookie-file-p*
                           (yes-or-no-p
                            (format "Using Defaut Cookie File?\n%s" file)))
                   file)))
             (read-file-name "［Diigo Cookie File］：")))))))

;; 从文件加载登录信息:1 ends here
;; **** 读取书签的数量


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*读取书签的数量][读取书签的数量:1]]
(cl-defun gloss--read-count ()
  (let ((default-value 1))
    (read-string (concat "Count "
                         (format "(default: %s)" default-value)
                         ": ")
                 nil nil default-value)))

;; 读取书签的数量:1 ends here
;; **** 弹出可读窗口


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*弹出可读窗口][弹出可读窗口:1]]
(defvar *gloss--popup* "*Diigo Bookmarks*")
(defvar *gloss--popup-view* "*Diigo Search Bookmarks*")

(defun gloss--popup (response)
  (let ((popup *gloss--popup-view*)
        (content (with-temp-buffer (dolist (item (gloss--format response)) (insert item)) (buffer-string)))
        (eww-buffer (current-buffer)))
    (when response
      (when (get-buffer popup)
        (kill-buffer (get-buffer popup)))
      (delete-other-windows)
      (with-current-buffer (get-buffer-create popup)
        (insert content) (goto-char (point-min))
        (gloss-view-mode))
      (when (and (eq major-mode (quote eww-mode))
                 (with-current-buffer eww-buffer
                   (and (boundp (quote eww-data)) eww-data
                        (eww-current-url) (string-match (eww-current-url) content)))
                 (> (window-width) 100))
        (split-window-right (truncate (* (window-width) 0.618)))
        (switch-to-buffer eww-buffer)
        (other-window 1))
      (switch-to-buffer popup))))

;; 弹出可读窗口:1 ends here
;; **** 切换保存书签的方式


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*切换保存书签的方式][切换保存书签的方式:1]]
(cl-defun gloss--background-save-bookmark-function ()
  (if current-prefix-arg
      (function gloss-background-save-bookmark)
    (function gloss-background-save-bookmark-with-hook)))

;; 切换保存书签的方式:1 ends here
;; **** Yasnippet


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*Yasnippet][Yasnippet:1]]
(cl-defun gloss--snippet (additional-headers)
  (let ((function (gloss--background-save-bookmark-function)))
    (gloss-format--list-to-string
     (if eww-data
         `(,function
           ,(plist-get eww-data :url)
           :title ,(plist-get eww-data :title)
           :description "$1"
           :tags nil
           :lists nil
           :groups "meichen"
           :private ,(car
                      (read-from-string "${3:nil}"))
           :unread ,(car
                     (read-from-string "${2:nil}"))
           :additional-headers ',additional-headers)
       `(,function
         "$1"
         :title "$2"
         :description "$3"
         :tags nil
         :lists nil
         :groups "meichen"
         :private ,(car
                    (read-from-string "${5:nil}"))
         :unread ,(car
                   (read-from-string "${4:nil}"))
         :additional-headers ',additional-headers)))))

;; Yasnippet:1 ends here
;; **** 读取保存网页到书签的网址和标题等


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*读取保存网页到书签的网址和标题等][读取保存网页到书签的网址和标题等:1]]
(cl-defun gloss--read-save-page-to-bookmark ()
  (let ((url-and-title
         (cl-case major-mode
           (eww-mode
            (let ((plist eww-data))
              (when plist
                (list (plist-get plist :url)
                      (plist-get plist :title)))))
           (eaf-mode
            (list (eaf-get-path-or-url)
                  ""))
           (elfeed-show-mode
            (let ((cl-x elfeed-show-entry))
              (when cl-x
                (list (elfeed-entry-link cl-x)
                      (elfeed-entry-title cl-x)))))
           (t (list (read-string "Url: ")
                    (read-string "Title: ")))))
        (description (read-string "Description: ")))
    (unless (fboundp 'string-blank-p)
      (require 'subr-x))
    (when (and url-and-title
               (not (string-blank-p (car url-and-title))))
      (list url-and-title description))))

;; 读取保存网页到书签的网址和标题等:1 ends here
;; **** 保存当前网页到书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*保存当前网页到书签][保存当前网页到书签:1]]
(cl-defun gloss--save-current-page-to-bookmark (save-bookmark-function &optional private)
  (let ((input (gloss--read-save-page-to-bookmark)))
    (when input
      (apply (lambda (url-and-title description)
               (apply (lambda (url title)
                        (funcall save-bookmark-function
                                 url
                                 :title title
                                 :description description
                                 :tags nil
                                 :lists nil
                                 :groups "meichen"
                                 :private private
                                 :unread nil
                                 :additional-headers (gloss--read-cookie-file)))
                      url-and-title))
             input))))

;; 保存当前网页到书签:1 ends here
;; ***** 公开书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*公开书签][公开书签:1]]
(cl-defun gloss-save-current-page-to-bookmark ()
  (interactive)
  (when (eq (key-binding (kbd "b"))
            (function eww-add-bookmark))
    (run-hooks (quote eww-mode-hook)))
  (gloss--save-current-page-to-bookmark
   (if current-prefix-arg
       (function gloss-save-bookmark)
     (gloss--background-save-bookmark-function))))

(cl-defun gloss-save-current-page-to-bookmark-with-hook ()
  (interactive)
  (gloss--save-current-page-to-bookmark (function gloss-background-save-bookmark-with-hook)))

(cl-defun gloss-save-current-page-to-bookmark-without-hook ()
  (interactive)
  (gloss--save-current-page-to-bookmark (function gloss-background-save-bookmark)))

;; 公开书签:1 ends here
;; ***** 非公开书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*非公开书签][非公开书签:1]]
(cl-defun gloss-save-current-page-to-private-bookmark ()
  (interactive)
  (when (eq (key-binding (kbd "b"))
            (function eww-add-bookmark))
    (run-hooks (quote eww-mode-hook)))
  (gloss--save-current-page-to-private-bookmark
   (if current-prefix-arg
       (function gloss-save-bookmark)
     (gloss--background-save-bookmark-function))))

(cl-defun gloss-save-current-page-to-private-bookmark-with-hook ()
  (interactive)
  (gloss--save-current-page-to-private-bookmark (function gloss-background-save-bookmark-with-hook)))

(cl-defun gloss-save-current-page-to-private-bookmark-without-hook ()
  (interactive)
  (gloss--save-current-page-to-bookmark (function gloss-background-save-bookmark) t))

;; 非公开书签:1 ends here
;; **** 查询最近的书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*查询最近的书签][查询最近的书签:1]]
(cl-defun gloss-recent-bookmarks ()
  (interactive)
  (gloss--popup
   (gloss-recent-bookmarks--request
    (gloss--read-count)
    (gloss--read-cookie-file))))

;; 查询最近的书签:1 ends here
;; **** 按关键字查询书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*按关键字查询书签][按关键字查询书签:1]]
(cl-defun gloss-search-bookmarks (what)
  (interactive
   (list (read-string "what: ")))
  (gloss--popup
   (gloss-search-bookmarks--request
    what
    (gloss--read-count)
    (gloss--read-cookie-file))))

;; 按关键字查询书签:1 ends here
;; **** 编辑书签表单


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*编辑书签表单][编辑书签表单:1]]
(defvar *gloss-edit-bookmark-save* "C-c '")
(defvar *gloss-edit-bookmark-abort* "C-c C-k")

(cl-defun gloss-edit-bookmark ()
  (interactive)
  (let ((popup (generate-new-buffer-name "gloss-edit-bookmark"))
        (snippet (gloss--snippet (gloss--read-cookie-file))))
    (when (get-buffer popup)
      (kill-buffer
       (get-buffer popup)))
    (switch-to-buffer popup)
    (emacs-lisp-mode)
    (yas-minor-mode-on)
    (yas-expand-snippet snippet)
    (delete-other-windows)
    (rename-buffer popup)
    (local-set-key (kbd *gloss-edit-bookmark-save*)
                   (function gloss-edit-bookmark-save))
    (local-set-key (kbd *gloss-edit-bookmark-abort*)
                   (function gloss-edit-bookmark-abort))
    (gloss--set-local
     'header-line-format
     (format "Edit, then save with %s -- %s to abort"
             (gloss--key-binding 'gloss-edit-bookmark-save)
             (gloss--key-binding 'gloss-edit-bookmark-abort)))))

(cl-defun gloss-edit-bookmark-save ()
  (interactive)
  (eval-buffer)
  (gloss-kill-this-buffer))

(cl-defun gloss-edit-bookmark-abort ()
  (interactive)
  (gloss-kill-this-buffer))

;; 编辑书签表单:1 ends here
;; **** ace-link


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*ace-link][ace-link:1]]
(cl-defun gloss-ace-link ()
  "仿造`ace-link-eww'和`ace-link-org'所得到的"
  (interactive)
  (let ((pt (avy-with ace-link-org
              (avy--process
               (mapcar (function cdr)
                       (ace-link--org-collect))
               (avy--style-fn avy-style)))))
    (when (number-or-marker-p pt)
      (goto-char (1+ pt))
      (eww
       (car
        (eww-suggested-uris))))))

;; ace-link:1 ends here
;; **** 显示当前eww网页的书签


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*显示当前eww网页的书签][显示当前eww网页的书签:1]]
(cl-defun gloss-search-eww-current-url ()
  (interactive)
  (gloss--popup
   (gloss-search-bookmarks--request
    (eww-current-url)
    1
    (gloss--read-cookie-file))))

;; 显示当前eww网页的书签:1 ends here
;; **** kill-this-buffer


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*kill-this-buffer][kill-this-buffer:1]]
(cl-defun gloss-kill-this-buffer ()
  (interactive)
  (kill-buffer))

;; kill-this-buffer:1 ends here
;; **** add/remove eww-after-render-hook


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*add/remove eww-after-render-hook][add/remove eww-after-render-hook:1]]
(cl-defun gloss-remove-eww-after-render-hook ()
  (interactive)
  (remove-hook
   'eww-after-render-hook
   (function gloss-search-eww-current-url)))

(cl-defun gloss-add-eww-after-render-hook ()
  (interactive)
  (add-hook
   'eww-after-render-hook
   (function gloss-search-eww-current-url)))

;; add/remove eww-after-render-hook:1 ends here
;; ** EOF


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*EOF][EOF:1]]
(provide 'gloss)

;; Copyright (c) 2018, SunDawning <dpmeichen@gmail.com> https://github.com/SunDawning
;; All rights reserved.
;;
;; Redistribution and use in source and binary forms, with or without
;; modification, are permitted provided that the following conditions are met:
;;
;; 1. Redistributions of source code must retain the above copyright notice, this
;;    list of conditions and the following disclaimer.
;; 2. Redistributions in binary form must reproduce the above copyright notice,
;;    this list of conditions and the following disclaimer in the documentation
;;    and/or other materials provided with the distribution.
;;
;; THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
;; ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
;; WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
;; DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
;; ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
;; (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
;; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
;; ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
;; (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
;; SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
;;
;; The views and conclusions contained in the software and documentation are those
;; of the authors and should not be interpreted as representing official policies,
;; either expressed or implied, of any organization or project.

;; EOF:1 ends here
