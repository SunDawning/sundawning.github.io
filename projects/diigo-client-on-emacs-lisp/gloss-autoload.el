;; * gloss-autoload.el


;; [[file:~/literate-programming/diigo-client-on-emacs-lisp.org::*gloss-autoload.el][gloss-autoload.el:1]]
(dolist (function '(gloss-save-current-page-to-bookmark
                    gloss-save-current-page-to-private-bookmark
                    gloss-recent-bookmarks
                    gloss-search-bookmarks
                    gloss-edit-bookmark
                    gloss-ace-link
                    gloss-remove-eww-after-render-hook
                    gloss-add-eww-after-render-hook
                    gloss-search-eww-current-url))
  (autoload function "gloss" nil t))

(dolist (function
         (function (gloss-save-bookmark
                    gloss-save-bookmark-with-hook)))
  (autoload function "gloss"))

(provide 'gloss-autoload)

;; gloss-autoload.el:1 ends here
