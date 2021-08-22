"""
Adding an attribute to a Python dictionary from the standard library - Stack Overflow: https://stackoverflow.com/questions/11532060/adding-an-attribute-to-a-python-dictionary-from-the-standard-library
"""
class Dict(dict):
    pass

def Foo():
    SELF=Dict()
    SELF.a=1
    def b():
        return SELF.a
    SELF.b=b
    return SELF
foo=Foo()
foo.a=2
print(foo.b())
