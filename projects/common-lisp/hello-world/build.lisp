(load "./index.lisp")
(sb-ext:save-lisp-and-die "index.exe" :executable t :toplevel (function index))
