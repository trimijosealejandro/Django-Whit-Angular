from rest_framework import serializers
from EmployeeApp.models import Departaments, Employees

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departaments
        fields = ('DepartmentId',
                  'DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeeId',
                  'EmployeeName',
                  'Department',
                  'DateOfJoining',
                  'photoFileName')
    