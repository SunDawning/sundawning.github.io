;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*使用说明][使用说明:1]]
(let ((gloss-user '"(add-to-list 'load-path
             \"~/.emacs.d/site-lisp/diigo-client-on-emacs-lisp/\")

(require 'gloss-autoload)

(setf *gloss-cookie-file* \"~/literate-programming/diigo-cookie\")

(setf *gloss-using-default-cookie-file-p* t)

(dolist (hook '(eww-mode-hook elfeed-show-mode-hook))
  (add-hook
   hook
   (lambda ()
     (local-set-key (kbd \"b\")
                    'gloss-save-current-page-to-bookmark)
     (local-set-key (kbd \"B\")
                    'gloss-save-current-page-to-private-bookmark))))
"))
(with-temp-buffer
  (insert gloss-user)
  (eval-buffer))
)
;; 使用说明:1 ends here
